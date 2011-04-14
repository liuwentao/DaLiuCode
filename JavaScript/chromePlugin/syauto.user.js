// ==UserScript==
// @name          裕日勤务助手
// @namespace     http://liu6.org
// @description  为在江苏润和出差的同事填写勤务提供便利.在公司的同事一般用不到该脚本
// @include       http://sysystem.com.cn:8080/QinWu/*
// ==/UserScript==
function fixCombox(){
	var boxs =document.getElementsByTagName('select');
	for (var i = 0; i < boxs.length; i++) {
		var box=boxs[i];
		if (contains(box.name,"kind",true)) {
			box.selectedIndex=1;
		};
	};

}

/*
 *
 *string:原始字符串
 *substr:子字符串
 *isIgnoreCase:忽略大小写
 */
function contains(string,substr,isIgnoreCase)
{
	if(isIgnoreCase)
	{
		string=string.toLowerCase();
		substr=substr.toLowerCase();
	}
	var startChar=substr.substring(0,1);
	var strLen=substr.length;
	for(var j=0;j<string.length-strLen+1;j++)
	{
		if(string.charAt(j)==startChar)//如果匹配起始字符,开始查找
		{
			if(string.substring(j,j+strLen)==substr)//如果从j开始的字符与str匹配，那ok
			{
				return true;
			}   
		}
	}
	return false;
}

/*
 * 设置textbox的值
 */
function fixedTextBox(par,i,val){
	var ids='form:datatable:'+i+':'+par;
	var txt=document.getElementById(ids);
	if (txt!=null) {
		txt.value=val;
	};
}

/**
 *
 *修改表格中的数据
 *
 *
 */
function FixedQinWuTable(){
	var tbl =document.getElementById('form:datatable');
	for (var i = 1; i < tbl.rows.length; i++) {
		var cell =tbl.rows[i].cells[0];
		if(cell.innerHTML!=null){
			if(contains(cell.innerHTML,'blue',true)){
				continue;
			}
			if (contains(cell.innerHTML,'red',true)) {
				FixedKind(i-1,true);
				fixedTextBox('startTime',i-1,'13:00');
				fixedTextBox('endTime',i-1,'17:00')
			}else{
				FixedKind(i-1,true);
				fixedTextBox('startTime',i-1,'09:00');
				fixedTextBox('endTime',i-1,'18:00');
			}
		}
	};
}
/*
 *
 *设置工时入力页面的项目和项目编号
 *
 */
function FixedInputTable(){
	FixedInputTextBox('add:dataList:0:项目名','江苏润和常驻项目');
	FixedInputTextBox('add:dataList:0:项目编号','SYXA-HUPREUN-200912');
	FixedKind(0,false);

}

/*
 * 设置下拉框的值
 */
function FixedKind(index,flg){
	if (flg) {
		var box =document.getElementById('form:datatable:'+index+':kind');
	}else
	{
		var box =document.getElementById('add:dataList:'+0+':selectValue');
	}
	if (box!=null) {
		box.selectedIndex=1;
	};

}
/*
 *
 * 设置文本框的值
 *
 */
function FixedInputTextBox(txt,val){
	var txt=document.getElementById(txt);
	if (txt!=null) {
		txt.value=val;
	};
}
//fixCombox();
//提示是否自动填写
if (document.title=='勤务表'){
	if(confirm('是否自动填写?')){
		FixedQinWuTable();
	}
};
if (document.title==''){
	FixedInputTable();
};

