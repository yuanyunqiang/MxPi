from channels.generic.websocket import WebsocketConsumer
from channels.generic.websocket import AsyncWebsocketConsumer
import json,shlex,mxpi
import traceback
import subprocess,threading,os 
import asyncio,platform
import signal
if (platform.system()=='Windows'):
    pass
else:
    import  fcntl

class RunThread (threading.Thread):
    def __init__(self, chat):
        threading.Thread.__init__(self)
        self.chat = chat
        self.read_stop=False
    def stop(self):
        if (platform.system()=='Windows'):
            p.terminate()
            self.read_stop=True
        else:
            self.read_stop=True
            os.killpg( p.pid,signal.SIGUSR1)
    def run(self):
        global p
        url=os.path.dirname(mxpi.__file__)
        url=url.replace('\\','/')
        if (platform.system()=='Windows'):
            shell_cmd ='python -u '+url+'/file/test.py'
        else:
            shell_cmd ='sudo python3 -u '+url+'/file/test.py'
        cmd = shlex.split(shell_cmd)
        try:
            if (platform.system()=='Windows'):
                p = subprocess.Popen(shell_cmd,shell=False,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
                for i in iter(p.stdout.readline,'b'):
                    if not i:
                        break
                    if self.read_stop:
                        break
                    print(i.decode('gbk'), end='')
                    self.chat.send(json.dumps({'msg':'run_msg','data':i.decode('gbk')}))
                for i in iter(p.stderr.readline,'b'):
                    if not i:
                        break
                    if self.read_stop:
                        break
                    print(i.decode('gbk'), end='')
                    self.chat.send(json.dumps({'msg':'run_msg_err','data':i.decode('gbk')}))
                self.chat.send(json.dumps({'msg':'stop','data':'停止运行'}))
                p.stdout.close()
                print('运行结束')
            else:
                p = subprocess.Popen(cmd, shell=False, stdout=subprocess.PIPE, stderr=subprocess.PIPE, bufsize=1,close_fds=True, preexec_fn = os.setsid)
                fd = p.stdout.fileno()
                fl = fcntl.fcntl(fd, fcntl.F_GETFL)
                fcntl.fcntl(fd, fcntl.F_SETFL, fl | os.O_NONBLOCK)
                fd2 = p.stderr.fileno()
                fl2 = fcntl.fcntl(fd2, fcntl.F_GETFL)
                fcntl.fcntl(fd2, fcntl.F_SETFL, fl2 | os.O_NONBLOCK)
                while 1:
                    try:
                        line = p.stdout.readline()
                        err = p.stderr.readline()
                        if line.decode() == '' and  p.poll() is not None:
                            print(p.poll())
                            break
                        if line:
                            line = line.strip()
                            self.chat.send(json.dumps({'msg':'run_msg','data':line.decode()}))
                            print(line.decode())
                        if err:
                            self.chat.send(json.dumps({'msg':'run_msg_err','data':err.decode()}))
                        if self.read_stop:
                            break
                    except Exception as e:
                        pass
                self.chat.send(json.dumps({'msg':'stop','data':'停止运行'}))
                print('运行结束')
        except Exception as e:
            print(str(e))
            self.chat.send(json.dumps({'msg':'run_err_msg','data':traceback.format_exc()}))
            self.chat.send(json.dumps({'msg':'stop','data':'停止运行'}))


class Pip_install_Thread (threading.Thread):
    def __init__(self, chat,name,url):
        threading.Thread.__init__(self)
        self.chat = chat
        self.read_stop=False
        self.name=name
        self.url=url
    def run(self):
        global p
        if(platform.system()=='Windows'):
            shell_cmd ='pip install '+self.name
        else:
            shell_cmd ='sudo pip3 install '+self.name+' -i https://pypi.tuna.tsinghua.edu.cn/simple'
        self.chat.send(json.dumps({'msg':'pip_msg','data':shell_cmd}))
        print(shell_cmd)
        cmd = shlex.split(shell_cmd)
        try:
            if (platform.system()=='Windows'):
                self.p = subprocess.Popen(shell_cmd,shell=False,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
                for i in iter(self.p.stdout.readline,'b'):
                    if not i:
                        break
                    if self.read_stop:
                        break
                    print(i.decode('gbk'), end='')
                    self.chat.send(json.dumps({'msg':'pip_msg','data':i.decode('gbk')}))
                for i in iter(self.p.stderr.readline,'b'):
                    if not i:
                        break
                    if self.read_stop:
                        break
                    print(i.decode('gbk'), end='')
                    self.chat.send(json.dumps({'msg':'pip_msg_err','data':i.decode('gbk')}))
                self.chat.send(json.dumps({'msg':'pip_stop','data':'结束'}))
                self.p.stdout.close()
                print('结束')
            else:
                p = subprocess.Popen(cmd, shell=False, stdout=subprocess.PIPE, stderr=subprocess.PIPE, bufsize=1,close_fds=True, preexec_fn = os.setsid)
                fd = p.stdout.fileno()
                fl = fcntl.fcntl(fd, fcntl.F_GETFL)
                fcntl.fcntl(fd, fcntl.F_SETFL, fl | os.O_NONBLOCK)
                fd2 = p.stderr.fileno()
                fl2 = fcntl.fcntl(fd2, fcntl.F_GETFL)
                fcntl.fcntl(fd2, fcntl.F_SETFL, fl2 | os.O_NONBLOCK)
                while self.read_stop==False:
                    line = p.stdout.readline()
                    err = p.stderr.readline()
                    if line.decode() == '' and err.decode() == '' and p.poll() is not None:
                        break
                    if line:
                        line = line.strip()
                        self.chat.send(json.dumps({'msg':'pip_msg','data':line.decode()}))
                        print(line.decode())
                    if err:
                        err = err.strip()
                        self.chat.send(json.dumps({'msg':'pip_err_msg','data':err.decode()}))
                        print(err.decode())
                    if self.read_stop:
                        break
                self.chat.send(json.dumps({'msg':'pip_stop','data':'结束'}))
                print('结束')
        except Exception as e:
            self.chat.send(json.dumps({'msg':'pip_err_msg','data':traceback.format_exc()}))
            self.chat.send(json.dumps({'msg':'pip_stop','data':'结束'}))

class ChatConsumer(WebsocketConsumer):
    # websocket建立连接时执行方法
    def connect(self):
        self.accept()
     
    # websocket断开时执行方法
    def disconnect(self, close_code):
        self.close()
     
    # 从websocket接收到消息时执行函数
    def receive(self, text_data):
        data=json.loads(text_data)
        if data['msg']=='run':
            self.sendRun=RunThread(self)
            self.sendRun.start()
            self.send(json.dumps({'msg':'run_msg','data':'开始运行'}))
            print('开始运行')
        elif data['msg']=='stop':
            self.sendRun.stop()
            self.sendRun.read_stop=True
            
        elif data['msg']=='pip_install':
            self.pip_install_Run=Pip_install_Thread(self,data['name'],data['url'])
            self.pip_install_Run.start()
            self.send(json.dumps({'msg':'pip_msg','data':'开始安装'}))
        
        elif data['msg']=='upclock':
            url=os.path.dirname(mxpi.__file__)
            f=open(url+'/file/mxpi.mxpi','w')
            f.write(data['code'])
            f.close()
        elif data['msg']=='loadclock':
            try:
                url=os.path.dirname(mxpi.__file__)
                f=open(url+'/file/mxpi.mxpi','r')
                self.send(json.dumps({'msg':'load_msg','data':f.read()}))
                self.send(json.dumps({'msg':'run_msg','data':'读取缓存程序成功'}))
            except:
                self.send(json.dumps({'msg':'load_msg','data':''}))
                self.send(json.dumps({'msg':'run_msg','data':'读取缓存程序失败'}))




