import sys,os,socket
import argparse
from rich.console import Console
import mxpi,platform


def cmds(cmd):
    os.system(cmd)

def get_host_ip():
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            s.connect(('8.8.8.8', 80))
            ip = s.getsockname()[0]
            #print(ip)
            return ip
        finally:
            s.close()

def main():
    parser = argparse.ArgumentParser()
    parser.description='You can specify ip and port'
    parser.add_argument("-b", "--ip", help="Ip Address", default=False)
    parser.add_argument("-p", "--post", help="Access Port", default=False)
    args = parser.parse_args()

    if args.ip==False:
        ip=get_host_ip()
    else:
        ip=args.ip
    if args.post==False:
        post='80'
    else:
        post=args.post

    console = Console()
    #console.print("Welcome to MxPi(0.0.36)!:smiley:",style="bold red")
    console.print("Welcome to MxPi(0.0.36)!:smiley:   System:"+platform.system()+"   IP: "+ip+":"+post,style="bold red")
    #print('cd '+os.path.dirname(mxpi.__file__)+' & sudo daphne mxpi.app.asgi:django_application -b '+ip+" -p "+post)
    if(platform.system()=='Windows'):
    	cmds('cd '+os.path.dirname(mxpi.__file__)+' & daphne mxpi.app.asgi:django_application -b '+ip+" -p "+post)
    else:
    	cmds('cd '+os.path.dirname(mxpi.__file__)+' & sudo daphne mxpi.app.asgi:django_application -b '+ip+" -p "+post)
   

