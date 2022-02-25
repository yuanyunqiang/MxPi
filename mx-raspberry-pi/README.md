
#### 1.安装
使用pip进行安装与更新最新版本

###### Windows
```
pip install -U mxpi
```
###### Liunx(Raspberry Pi)

```
sudo pip3 install -U mxpi
```
#### 2.使用
在终端或者CMD中运行以下命令

```
#Windows
mxpi
#Liunx or Raspberry Pi
sudo mxpi
```
运行后会获得如下信息

```
Welcome to MxPi(0.0.xx)!  System:xxxxx   IP: x.x.x.x:xxxx
2022-02-11 15:56:10,412 INFO     Starting server at tcp:port=80:interface=192.168.1.129
2022-02-11 15:56:10,414 INFO     HTTP/2 support not enabled (install the http2 and tls Twisted extras)
2022-02-11 15:56:10,415 INFO     Configuring endpoint tcp:port=80:interface=192.168.1.129
2022-02-11 15:56:10,418 INFO     Listening on TCP address x.x.x.x:xxxx
```
在浏览器中打开IP地址x.x.x.x:xxxx

#### 3.说明
若使用Windows卸载或者更新MxPi最新版本时会出现以下错误

```
UnicodeDecodeError: 'utf-8' codec can't decode byte 0xd0 in position 12091: 
invalid continuation byte in installed-files.txt file at path: 
xxx/installed-files.txt
```
这是由于系统默认编码的问题,这个问题不是由MxPi造成的,你可以打开xxx/installed-files.txt文件，并将其编码模式修改为UTF-8后，再次进行卸载或者更新。


#### 4.更新信息
##### Version : 0.0.36 
1. 增加PyQt5相关模块
2. 增加文件管理功能
3. 修正了windows下出现编码错误的问题
4. 库管理信息输出更加合理
5. 修改了关于中的内容

#### 5.计划
- [ ] 添加百度AI相关模块
- [ ] 添加PyQt多线程模块
- [ ] 添加温度传感器模块
- [ ] 增加支持导出py文件的功能
