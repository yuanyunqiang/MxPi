from setuptools import setup, find_packages ,find_namespace_packages          #这个包没有的可以pip一下

with open("README.md", "r") as fh:
    long_description = fh.read()
    
setup(
    name = "mxpi",      #这里是pip项目发布的名称
    version = "0.0.36",  #版本号，数值大的会优先被pip
    keywords = ("pip", "SICA","featureextraction"),
    description = "MxPi",
    long_description = long_description,
    long_description_content_type="text/markdown", 
    license = "MIT Licence",
    url = "https://github.com/yuanyunqiang/",     #项目相关文件地址，一般是github
    author = "YuanYunQiang",
    author_email = "649756903@qq.com",
    packages = find_namespace_packages(
                     include=["mxpi", "mxpi.*"], ),
    include_package_data = True,
    platforms = "any",
    install_requires = ['Django',
                        'channels',
                        'ASGIMiddlewareStaticFile',
                        'rich'] , 
    entry_points={
          'console_scripts': [
              'mxpi = mxpi.__main__:main'
          ]
      },       
)
