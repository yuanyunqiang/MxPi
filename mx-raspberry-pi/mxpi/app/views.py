from django.shortcuts import render
from django.contrib.auth.backends import UserModel
from django.shortcuts import render
from django.http import HttpResponse, request, response
from django.http import HttpResponseRedirect, HttpResponse,FileResponse
from django.contrib.auth import authenticate,login, logout
from django.shortcuts import reverse,redirect
from django.db.models import Q
from django.contrib import messages
from django.contrib.auth.models import User
from MxPisite import settings
from django.utils import timezone
import subprocess,sys,mxpi,os,json,time
from app import models
import threading


# Create your views here.
def home(request):
    return render(request,'index.html')

def upfile(request):
    code = request.POST.get('code')
    f=open(os.path.dirname(mxpi.__file__)+'/file/test.py','w',encoding='utf-8')
    #f=open('file/test.py','w')
    f.write(code)
    f.close()
    return HttpResponse('ok')

def cmd_msg(request):
    datas=models.MxpiArticles.objects.filter(read=0)
    if len(datas)>0:
        datas[0].read=1
        datas[0].save()
        print(datas[0].body)
        return HttpResponse(datas[0].body)
    else:
        return HttpResponse('cmd')

def run_cmd(request):
    models.MxpiArticles.objects.filter(title='cmd').delete()
    p = subprocess.Popen('python -u file/test.py', shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT,bufsize=1)
    while p.poll() is None:
            #sys.stdout.flush()
            line = p.stdout.readline().strip()
            if line:
                line = _decode_data(line)
                print(line)
                #s=myThread(line)
                #s.start()
    return HttpResponse('ok')

class myThread (threading.Thread):
    def __init__(self, line):
        threading.Thread.__init__(self)
        self.line = line
    def run(self):
        models.MxpiArticles.objects.create(title='cmd',body=self.line,read=False)

def _decode_data(byte_data: bytes):
    """
    解码数据
    :param byte_data: 待解码数据
    :return: 解码字符串
    """
    try:
        return byte_data.decode('UTF-8')
    except UnicodeDecodeError:
        return byte_data.decode('GB18030')

def file_list(request):
    url=os.path.dirname(mxpi.__file__)+'/static/file'
    dirs=os.listdir(url)
    s=[]
    id=0
    for f in dirs:
        id += 1
        f_i={'id':'','name':'',"size":'','url':'','last':''}
        size=os.path.getsize(url+'/'+f)
        f_i['id']=id
        f_i['name']=f
        f_i['size']='%.2f' % float(size/1000) + 'KB'
        f_i['url']=url+'/'+f
        f_i['last']=time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(os.stat(url+'/'+f).st_mtime))
        s.append(f_i)
    data={
        'msg':'ok',
        'data':s,
    }
    return HttpResponse(json.dumps(data))

def file_remove(request):
    data=request.GET.get('data')
    os.remove(data)
    return HttpResponse('ok')

def files(request):
    try:
        file_obj = request.FILES.get('avatar')
        with open(os.path.dirname(mxpi.__file__)+'/static/file/'+file_obj.name, "wb") as f:
            for line in file_obj:
                f.write(line)
        return HttpResponse('ok')
    except:
        return HttpResponse('err')
