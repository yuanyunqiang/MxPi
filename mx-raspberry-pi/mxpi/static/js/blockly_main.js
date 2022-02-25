Blockly.Themes.Halloween = Blockly.Theme.defineTheme('halloween', {
    'base': Blockly.Themes.Classic,
    'categoryStyles': {
    'list_category': {
       'colour': "#7158e2"
     },
     'print_category': {
       'colour': '#f0932b',
     },
     'loop_category': {
       'colour': "#43A047",
     },
     'text_category': {
       'colour': "#10ac84",
     },
     'math_category': {
        'colour': "#22a6b3",
      },
      'logic_category': {
        'colour': "#40739e",
      },
      'tuple_category': {
        'colour': "#D1A36E",
      },
      'dict_category': {
        'colour': "#B1533C",
      },
      'catSet_category': {
        'colour': "#009933",
      },
      'GPIO_category': {
        'colour': "#009966",
      },
      'GUI_category': {
        'colour': "#00a8a8",
      },
      'BaiduAI_category': {
        'colour': "#0099CC",
      },
      'vari_category': {
        'colour': "#af5180",
      },
      'pro_category': {
        'colour': "#6D318E",
      },
    },
    'blockStyles': {
     'list_blocks': {
       'colourPrimary': "#fff",
       'colourSecondary':"#fff",
       'colourTertiary':"#fff"
     },
     'print_blocks': {
       'colourPrimary': "#f0932b",
       'colourSecondary':"#fff",
       'colourTertiary':"#F9A825"
     }, 
     'logic_blocks': {
      'colourPrimary': "#41759f",
      'colourSecondary':"#fff",
      'colourTertiary':"#7aa6c7"
    }, 
     'loop_blocks': {
       'colourPrimary': "#85E21F",
       'colourSecondary':"#fff",
       'colourTertiary':"#C5EAFF"
     }, 
     'GPIO_blocks': {
      'colourPrimary': "#009966",
      'colourSecondary':"#fff",
      'colourTertiary':"#009966"
    }, 
    'BaiduAI_blocks': {
      'colourPrimary': "#0099CC",
      'colourSecondary':"#fff",
      'colourTertiary':"#0099CC"
    }, 
    'GUI_blocks': {
      'colourPrimary': "#00a8a8",
      'colourSecondary':"#fff",
      'colourTertiary':"#00a8a8"
    }, 
     'text_blocks': {
       'colourPrimary': "#f0932b",
       'colourSecondary':"#66BB6A",
       'colourTertiary':"#C5EAFF"
     } 
    },
    'componentStyles': {
      'workspaceBackgroundColour': '#fff',
      'toolboxBackgroundColour': '#EEEEEE',
      'toolboxForegroundColour': '#fff',
      'flyoutBackgroundColour': '#E0E0E0',
      'flyoutForegroundColour': '#252526',
      'flyoutOpacity': 0.5,
      'scrollbarColour': '#757575',
      'insertionMarkerColour': '#fff',
      'insertionMarkerOpacity': 0.3,
      'scrollbarOpacity': 0.4,
      'cursorColour': '#d0d0d0',
      'blackBackground': '#333'
    }
  });

var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var workspace = Blockly.inject(blocklyDiv,
    {   disable:true,
        toolbox: document.getElementById('toolbox-categories'),
        media:'./static/media/',
        theme: Blockly.Themes.Halloween,
        grid:   {spacing: 20,
                length: 1,
                colour: '#ccc',
                snap: true},
        move:  {
            scrollbars: {
              horizontal: true,
              vertical: true
            },
            drag: true,
            wheel: false},
        zoom:
            {controls: true,
             wheel: true,
             startScale: 1.0,
             maxScale: 3,
             minScale: 0.3,
             scaleSpeed: 1.3,
             pinch: true},
        trashcan: true,
        
});
var onresize = function(e) {
  // Compute the absolute coordinates and dimensions of blocklyArea.
  var element = blocklyArea;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
    
  } while (element);
  // Position blocklyDiv over blocklyArea.
  blocklyDiv.style.left = x + 'px';
  blocklyDiv.style.top = y + 'px';
  blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
  blocklyDiv.style.height = blocklyArea.offsetHeight+ 'px';
  console.log(blocklyDiv.style.height)
  Blockly.svgResize(workspace);
};
window.addEventListener('resize', onresize, false);
onresize();
Blockly.svgResize(workspace);

function myUpdateFunction(event) {
  //var content = document.getElementById('content_python')
  //content.textContent = '';
  var code = Blockly.Python.workspaceToCode(workspace);
  //content.textContent = code;
  console.log(code)
  //content.className = content.className.replace('prettyprinted', '');
}
workspace.addChangeListener(myUpdateFunction);
var sidecodeDisplay=false;
function sidecodeClick(){
  if(sidecodeDisplay){
  document.getElementById('side_code_parent').style.display = 'none';
  document.getElementById('sidebar').className='right-top';
  document.getElementById('mid_td').style.display = 'none';
  sidecodeDisplay=false;
  }else{
  document.getElementById('side_code_parent').style.display = '';
  document.getElementById('sidebar').className='right-top2';
  document.getElementById('mid_td').style.display = '';
  sidecodeDisplay=true;
  }
  Blockly.fireUiEvent(window, 'resize');
}

function changeThemeFile( theme )
    {
        if( theme && typeof theme === 'string' )
        {
            document.getElementById( 'syntaxy-theme-hook' ).href = 'static/css/syntaxy.'+ theme +'.min.css';
        }
    }

$("#Dark").click(function() {
  changeThemeFile( "dark" )
}); 
$("#Light").click(function() {
  changeThemeFile( "light" )
}); 
$("#Purple").click(function() {
  changeThemeFile( "purple" )
}); 
workspace.addChangeListener(rightCodeEvent);
function rightCodeEvent(masterEvent) {
  if (masterEvent.type == Blockly.Events.UI) {
  return;  // Don't update UI events.
  }
  //更新
  //var arduinoTextarea = document.getElementById('side_code');
  var code = Blockly.Python.workspaceToCode(Blockly.mainWorkspace) || '';
  console.log(code)
  
    var codebox = document.getElementById("codebox");
    codebox.innerHTML=code
    var options = {minHeight:'100%'};
  $( '#codebox' ).syntaxy( options );
}



function upcode(){
    //var content = document.getElementById('content_python')
    //content.textContent = '';
    var code = Blockly.Python.workspaceToCode(workspace);
    return code
}

function savefile(){
  const xml = Blockly.Xml.workspaceToDom(workspace);
  const xmlText = Blockly.Xml.domToText(xml);
  return xmlText
}

function openfile(data){
  const xml = Blockly.Xml.textToDom(data);
  Blockly.Xml.domToWorkspace(xml, workspace);
  return "项目已打开"
}
var list_num=0
var list_nums=0
var list_num_pip=0
var list_nums_pip=0
var UpBtn = document.getElementById("upfile");
var run_run=false
function upfile(){
  if (run_run==false){
    list_num=0
    list_nums=0
	  var code = Blockly.Python.workspaceToCode(workspace);
    var fd = new FormData();
    fd.append('code',code)
	  $.ajax({
	    url:"./upfile_Ajax",
	    type:"post",
	    data:fd,
      contentType: false,  
      processData: false, 
	    success:function(data1){
		console.log(data1)
    clears()
    upclock()
		add('上传成功,开始运行...')
		chatSocket.send(JSON.stringify({'msg':'run'}))
		UpBtn.innerHTML='<i class="fa fa-stop" aria-hidden="true"></i>'
    document.getElementById('upfile').className='button button-action4 button-box';
		run_run=true
	    }
	    })
	}
 else{
    console.log('stop')
    chatSocket.send(JSON.stringify({'msg':'stop'}))
  }
}

var instance
var chatSocket
var c
var con_btn=document.getElementById('connect_server')
var con_btn_ui=document.querySelector("#connect_server > i")
window.onload = function () {                                    /*chushihua*/

  chatSocket = new WebSocket('ws://' + window.location.host + '/ws/run/');
  chatSocket.onopen = function () {
    console.log(' ' + 'websocket connection success')
    chatSocket.send(JSON.stringify({'msg':'loadclock'}))
    add('已与树莓派端建立连接')
    c=true
    con_btn.style.color='#00aa1c'
    con_btn_ui.className='fa fa-link'
    document.querySelector("body > div:nth-child(16) > div > div.tippy-tooltip-content").innerHTML='已连接'
  };
  chatSocket.onerror = function () {
    console.error(' ' + 'websocket connection error')
    add('树莓派端连接失败')
  };
  chatSocket.onclose = function (e) {
    console.error(' ' + 'websocket closed unexpectedly 状态码:' + e.code);
    add('与树莓派端已断开连接,请重新连接...'+' ' + 'websocket closed unexpectedly 状态码:' + e.code)
    con_btn.style.color='#F44336'
    con_btn_ui.className='fa fa-chain-broken'
    c=false
    chatSocket.close();
  };
  chatSocket.onmessage = function (e) {
    var data=JSON.parse(e.data)
    console.log(data)
    if(data['msg']=='run_msg'){
    add(data['data'])
    }
    else if (data['msg']=='run_err_msg'){
    adderr(data['data'])
    }
    else if(data['msg']=="stop"){
      add(data['data'])
      UpBtn.innerHTML='<i class="fa fa-play" aria-hidden="true"></i>'
      document.getElementById('upfile').className='button button-action3 button-box';
      run_run=false
    }
    else if(data['msg']=='pip_msg'){
      addpip(data['data'])
    }
    else if(data['msg']=='pip_err_msg'){
      addpip_err(data['data'])
    }
    else if(data['msg']=='pip_stop'){
      addpip(data['data'])
    }
    else if(data['msg']=='run_msg_err'){
      adderr(data['data'])
    }
    else if(data['msg']=='load_msg'){
      openfile(data['data'])
    }
  }
 var oBox = document.getElementById("blockly_box"); 
 var oTop = document.getElementById("blocklyDiv"); 
 var oTop1 = document.getElementById("blocklyArea");
 var oBottom = document.getElementById("side_code_parent");
 var oBottom1 = document.getElementById("output_img");
 var oLine = document.getElementById("mid_td");

 oLine.onmousedown = function(e) {
 	var disX = (e || event).clientX;
 	oLine.left = oLine.offsetLeft;

 	document.onmousemove = function(e) {
 		//console.log(oBox.clientWidth + " " + oLine.style.left + " " + disX + " " + (e || event).clientX);	
  		var iT = oLine.left + ((e || event).clientX - disX);
 		var e=e||window.event,tarnameb=e.target||e.srcElement;
  		var maxT = oBox.clientWidth;
		var minT = Blockly.mainWorkspace.toolbox_.width;
  		oLine.style.margin = 0;
  		iT < minT && (iT = minT);
  		iT > maxT && (iT = maxT);
		//console.log(oBox.clientWidth+" "+iT+" "+oTop1.style.width+" "+oTop.style.width);
		var percent=iT*100/oBox.clientWidth;
  		oTop1.style.width = percent + '%';
  		oTop.style.width = percent  + '%';  // no need this line
  		oLine.style.left = percent  + '%';
  		Blockly.fireUiEvent(window, 'resize');
  		oBottom.style.width = ( 100 - percent ) + '%';
        if(oBottom1 !== null) oBottom1.style.width = (oBox.clientWidth - iT) + "px";
  		return false;
 	}; 
 	document.onmouseup = function() {
  		document.onmousemove = null;
  		document.onmouseup = null; 
  		Blockly.fireUiEvent(window, 'resize');
  		oLine.releaseCapture && oLine.releaseCapture();
 	};
 	oLine.setCapture && oLine.setCapture();
 	return false;
 };
 new Tippy('.tippy',{theme:'light'})
 QuickDemo()
 $(".col-3 input").val("");
  $(".input-effect input").focusout(function(){
    if($(this).val() != ""){
      $(this).addClass("has-content");
    }else{
    $(this).removeClass("has-content");
    }
  });
  
  instance=$('.e-scrollbar-box-2,.e-scrollbar-box-1').overlayScrollbars({
    className       : "os-theme-dark",
    resize          : "none",
    sizeAutoCapable : true,
    paddingAbsolute : true,
    scrollbars : {clickScrolling : true,
                  autoHide :'never'
                  },
                  autoUpdateInterval:true
  }).overlayScrollbars();
  window.setInterval(function (){
    var code=savefile()
    chatSocket.send(JSON.stringify({'msg':'upclock','code':code}))
    add('自动缓存程序...')
  },10*60*1000);
} 
                                                         /*chushihua*/
function upclock()
  {
    var code=savefile()
    chatSocket.send(JSON.stringify({'msg':'upclock','code':code}))
    add('缓存程序...')
  }
var oScroll = document.getElementById("scrollOne");
var i=0

function clears() {
  var oP = document.querySelector("#cmd_ > div.os-padding > div > div")
  oP.innerHTML = '';
}

function clearss() {
  var oP = document.querySelector("#pip_cmd > div.os-padding > div > div")
  oP.innerHTML = '';
}

function mySplit(str,leng){
  let arr = [];
  let index = 0;
  while(index<str.length){
  arr.push(str.slice(index,index +=leng));
  }
  return arr;
  }

  function addpip(txt) {
    list_num_pip = list_num_pip+1
    list_nums_pip = list_nums_pip+1
    if(list_num_pip>2000){
    clearss()
    list_num_pip=0
	}	
    var oP = document.querySelector("#pip_cmd > div.os-padding > div > div")
    var oPs =document.createElement("p");
    var num= list_nums_pip
    oPs.innerHTML = "<div class='d1'><div class='d2'><a class='num'>"+num+"</a></div><div class='d3'><a class='d4'>"+txt+"</a></div></div>";
    oP.appendChild(oPs)
    instance[1].scroll({ y : "100%"  });
}

function add(txt) {
    list_num = list_num+1
    list_nums = list_nums+1
    if(list_num>2000){
    clears()
    list_num=0
	}	
    var oP = document.querySelector("#cmd_ > div.os-padding > div > div")
    var oPs =document.createElement("p");
    var num= list_nums
    oPs.innerHTML = "<div class='d1'><div class='d2'><a class='num'>"+num+"</a></div><div class='d3'><a class='d4'>"+txt+"</a></div></div>";
    oP.appendChild(oPs)
    instance[0].scroll({ y : "100%"  });
}
function adderr(txt) {
  list_num = list_num+1
  list_nums = list_nums+1
  if(list_num>2000){
  clears()
  list_num=0
}	
  var oP = document.querySelector("#cmd_ > div.os-padding > div > div")
  var oPs =document.createElement("p");
  var num= list_nums
  oPs.innerHTML = "<div class='d1'><div class='d2-err'><a class='num'>"+num+"</a></div><div class='d3-err'><a class='d4-err'>"+txt+"</a></div></div>";
  oP.appendChild(oPs)
  instance[0].scroll({ y : "100%"  });
}

function addpip_err(txt) {
  list_num = list_num+1
  list_nums = list_nums+1
  if(list_num>2000){
  clearss()
  list_num=0
}	
  var oP = document.querySelector("#pip_cmd > div.os-padding > div > div")
  var oPs =document.createElement("p");
  var num= list_nums
  oPs.innerHTML = "<div class='d1-err'><div class='d2-err'><a class='num'>"+num+"</a></div><div class='d3-err'><a class='d4-err'>"+txt+"</a></div></div>";
  oP.appendChild(oPs)
  instance[1].scroll({ y : "100%"  });
}

function save(){
  var code=savefile()
  myExport('MxPi.mxpi', code );
  
}

function fake_click(obj) {
  var ev = document.createEvent("MouseEvents");
  ev.initMouseEvent(
    "click", true, false, window, 0, 0, 0, 0, 0
    , false, false, false, false, 0, null
  );
  obj.dispatchEvent(ev);
}

function myExport(name, data) {
  var urlObject = window.URL || window.webkitURL || window;
  var myFile = new Blob([data]);
  var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
  save_link.href = urlObject.createObjectURL(myFile);
  save_link.download = name;
  fake_click(save_link);
}

function open_program(){
  $("#files").click();
}

function fileImport() {
  //获取读取我文件的File对象
  var selectedFile = document.getElementById('files').files[0];
  var name = selectedFile.name; //读取选中文件的文件名
  var size = selectedFile.size; //读取选中文件的大小
  console.log("文件名:" + name + "大小:" + size);
  var reader = new FileReader(); //这是核心,读取操作就是由它完成.
  reader.readAsText(selectedFile); //读取文件的内容,也可以读取文件的URL
  reader.onload = function() {
      //当读取完成后回调这个函数,然后此时文件的内容存储到了result中,直接操作即可
      console.log(this.result);
      openfile(this.result)
  }
}

function QuickDemo(){
  $("#authors").PopupWindow({
    height      : 400,
    width       : 600,
    title       : "关于",
    autoOpen    : false,
    buttons         : {
      close           : true,          // Boolean
      maximize        : false,          // Boolean
      collapse        : true,          // Boolean
      minimize        : true,          // Boolean
  },
    resizable:false,
  });
  $("#pip_content").PopupWindow({
      height      : 520,
      width       : 880,
      title       : "库管理",
      autoOpen    : false,
      buttons         : {
        close           : true,          // Boolean
        maximize        : false,          // Boolean
        collapse        : true,          // Boolean
        minimize        : true,          // Boolean
    },
      resizable:false,
  });
  $("#file_content").PopupWindow({
    height      : 620,
    width       : 1000,
    title       : "文件管理",
    autoOpen    : false,
    buttons         : {
      close           : true,          // Boolean
      maximize        : false,          // Boolean
      collapse        : true,          // Boolean
      minimize        : true,          // Boolean
  },
    resizable:false,
});

  $("#filemodel").on("click", function(event){
      $("#file_content").PopupWindow("open");
      file_list()
  });
  $("#pipmodel").on("click", function(event){
    $("#pip_content").PopupWindow("open");
    
  });
  $("#authormodel").on("click", function(event){
    $("#authors").PopupWindow("open");
  });
}

$("#pip_content").on("minimize.popupwindow", function(event){
  var models=document.getElementsByClassName('popupwindow_overlay')
  models[0].style.width='0px'
})

$("#pip_content").on("collapse.popupwindow", function(event){
  var models=document.getElementsByClassName('popupwindow_overlay')
  models[0].style.width='0px'
})

$("#pip_content").on("unminimize.popupwindow", function(event){
  var models=document.getElementsByClassName('popupwindow_overlay')
  models[0].style.width='100%'
})

$("#pip_content").on("uncollapse.popupwindow", function(event){
  var models=document.getElementsByClassName('popupwindow_overlay')
  models[0].style.width='100%'
})

function pipinstall(){
  clearss()
  list_num_pip=0
  list_nums_pip=0
  var pip_install_name=document.getElementById('pip_install_name').value;
  chatSocket.send(JSON.stringify({'msg':'pip_install','name':pip_install_name,'url':'https://pypi.doubanio.com/simple'}))
}

function connect_server(){
  if(c==false){
    add('开始连接树莓派端')
    chatSocket = new WebSocket('ws://' + window.location.host + '/ws/run/');
    chatSocket.onopen = function () {
      console.log(' ' + 'websocket connection success')
      add('已与树莓派端建立连接')
      con_btn.style.color='#00aa1c'
      con_btn_ui.className='fa fa-link'
      con_btn.disable=false
      document.querySelector("body > div:nth-child(16) > div > div.tippy-tooltip-content").innerHTML='重新连接'
    };
    chatSocket.onerror = function () {
      console.error(' ' + 'websocket connection error')
      add('树莓派端连接失败')
    };
    chatSocket.onclose = function (e) {
      console.error(' ' + 'websocket closed unexpectedly 状态码:' + e.code);
      add('与树莓派端已断开连接,请重新连接...'+' ' + 'websocket closed unexpectedly 状态码:' + e.code)
      con_btn.style.color='#F44336'
      con_btn_ui.className='fa fa-chain-broken'
      document.querySelector("body > div:nth-child(16) > div > div.tippy-tooltip-content").innerHTML='已连接'
      con_btn.disable=true
      chatSocket.close();
    };
    chatSocket.onmessage = function (e) {
      var data=JSON.parse(e.data)
      console.log(data)
      if(data['msg']=='run_msg'){
      add(data['data'])
      }
      else if (data['msg']=='run_err_msg'){
      adderr(data['data'])
      }
      else if(data['msg']=="stop"){
        add(data['data'])
        UpBtn.innerHTML='<i class="fa fa-play" aria-hidden="true"></i>'
        document.getElementById('upfile').className='button button-action3 button-box';
        run_run=false
      }
      else if(data['msg']=='pip_msg'){
        addpip(data['data'])
      }
      else if(data['msg']=='pip_err_msg'){
        addpip_err(data['data'])
      }
      else if(data['msg']=='pip_stop'){
        addpip(data['data'])
      }
    }
  }
}
function dateFormat(fmt, date) {
  let ret;
  const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
  };
  return fmt;
}
function file_list(){
  var printIcon = function(value, data, cell, row, options){ //plain text value
    return "<div style='display: flex;justify-content: space-around;'><i class='fa fa-clipboard' style='color: #00bd15;' onclick='copy(\""+data.url+"\")'></i><i class='fa fa-close' style='color: red;' onclick='del(\""+data.url+"\")'></i></div>"
  };
  $("#file_list").tabulator({
    columns:[
      {title:"名称", field:"name", sortable:true, sorter:"string", width:'30%', align:'center' ,editable:false},
      {title:"大小", field:"size", sortable:true, sorter:"number", width:'30%',align:'center' ,editable:false},
      {title:"修改时间", field:"last", sortable:true, sorter:"string", width:'30%',align:'center' ,editable:false},
      {title:"操作", field:"operate", sortable:false, sorter:"string",width:'10%', formatter:printIcon,onClick:function(e, val, cell, row){copy(row.url)}},
  ],
  height:'450px',
  });
  
  $.ajax({
    url:"./file_list",
    type:"GET",
    data:{},
    success:function(data1){
        var data=JSON.parse(data1)
        for(da of data['data']){
          da['last']=dateFormat("YYYY/mm/dd HH:MM:SS", new Date(da['last']))
        }
          $("#file_list").tabulator("setData",data['data'])
      }
    })
}

function copy(data) {
  let transfer = document.createElement('input');
  document.body.appendChild(transfer);
  transfer.value = data;  // 这里表示想要复制的内容
  transfer.focus();
  transfer.select();
  if (document.execCommand('copy')) {
      document.execCommand('copy');
  }
  transfer.blur();
  document.body.removeChild(transfer);
  spop({
    template: '复制成功',
    position  : 'top-right',
    autoclose: 1500,
    style: 'success'
  });
}

function del(data){
  console.log(data)
  $.ajax({
    url:"./file_remove",
    type:"GET",
    data:{'data':data},
    success:function(data1){
      console.log(data1)
      spop({
        template: '删除成功',
        position  : 'top-right',
        autoclose: 1500,
        style: 'success'
      });
      file_list()
      }
    })
}

$(".a-upload").on("change","input[type='file']",function(){
  document.querySelector("#load-ico").style.visibility="visible";
  var fd = new FormData();
  fd.append("avatar",$("#i1")[0].files[0]);
 $.ajax({
     url: '/files',
     type: 'post',
     data: fd,
     contentType: false,  
     processData: false,  
     success:function (res) {
       if(res=='ok'){
         file_list()
         document.querySelector("#load-ico").style.visibility="hidden";
         spop({
          template: '上传成功',
          position  : 'top-right',
          autoclose: 1500,
          style: 'success'
        });
       }
       else{
        document.querySelector("#load-ico").style.visibility="hidden";
        spop({
          template: '上传错误',
          position  : 'top-right',
          autoclose: 1500,
          style: 'error'
        });
       }
     }
 })
});