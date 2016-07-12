$(document).ready(function() {
	
	setHistory();
	
	var $new = $("a:nth-of-type(2)",$("div.bar"));

	$("a:nth-of-type(2)",$("div.bar")).on("click",function(e){	
	
		var $icon = $('<div class="file-icon borderShow"/>').append('<span class="fileSelect selectShow"/>').append('<div class="fileCover"/>');
	
		var $edit = $('<div class="edit-name"/>').append('<input type="text" class="box" value="新建文件夹"/>').append('<span class="ok"/>').append('<span class="cancel"/>');
	
		var $name = $('<div class="file-name"/>').append('<span class="item-name" title="新建文件夹">新建文件夹</span>').append($edit);
	
		var $child = $('<div class="item"></div>').append($icon).append($name);
		
		var $fileIcon = $child.find(".file-icon");
		var $fileSel = $child.find(".fileSelect");
		$fileIcon.removeClass("borderShow");
		$fileSel.removeClass("selectShow");
		$(".wrap").prepend($child);
		$selectAll.removeClass("selected");
		
		
		var $fileIcon = $child.find(".file-icon");
		var $fileSel = $child.find(".fileSelect");
		var $itemName = $child.find(".item-name");
		var $editName = $child.find(".edit-name");
		var $Input = $child.find("input");
		var $ok = $child.find(".ok");
		var $cancel = $child.find(".cancel");
					
		$itemName.hide();
		$editName.show();
		$Input.select();
		
		var val = $Input.val();
		
		$(document).keydown(function (event) {
			if(event.keyCode == 13){
				var newVal = $Input.val();
				$editName.hide();
				$itemName.text(newVal).show().attr("title",newVal);
				setHistory();	
			};
		});
		
		$ok.click(function(){
			var newVal = $Input.val();
			$editName.hide();
			$itemName.text(newVal).show().attr("title",newVal);
			setHistory();
		})
		
		$cancel.click(function(){
			$(".wrap").children().eq(0).remove();	
		})
		
		setTitle();
		
	})
	
	function delDir(target){
		if($(".selectNow").length!=0){
			var $delBtn = $(".operate a:nth-of-type(3)");
			$delBtn.off("click").on("click",function(){
				target = target?$(".selectNow").offsetParent().parent():$(".selectNow").offsetParent().parent();
				target.attr("del",true);
				$(".wrap").children("[del=true]").remove();
				$("#select").removeClass("selected");
				$rename.addClass("rename");
				$selInfo.hide();
				$buttons.hide();
				$selNum.html(0);
				setHistory();
			})
		}
	}
		
	var $selectAll = $("#select");
	var $selInfo = $(".selInfo");
	var $buttons = $(".operate").find("a");
	var $selNum = $(".selNum", ".operate");
	var $rename = $("a:nth-last-of-type(3)", $(".operate"));
	
	$selectAll.click(function(){
		
		var $items = $(".item").length; 
		var $fileIcons = $(".item",".container").find(".file-icon");
		var $fileSelect = $(".item",".container").find(".fileSelect");
		var $selectShow	= $(".selectShow");

		$(this).toggleClass('selected');

		if($(this).hasClass('selected')){

			$selNum.html($items);
			$selInfo.show();
			$buttons.show();
			$fileIcons.addClass("borderShow");
			$fileSelect.addClass("selectNow");
			$rename.addClass("rename");
			
			delDir($selectShow);

		}else{

			$selNum.html(0);
			$selInfo.hide();
			$buttons.hide();
			$fileIcons.removeClass("borderShow");
			$fileSelect.removeClass("selectShow");
			$fileSelect.removeClass("selectNow");
		}
	});
	
	
	$(".wrap").on({	
		mouseover: function(){
			$(".file-icon", $(this)).addClass("borderShow");
			$(".fileSelect", $(this)).addClass("selectShow");
			
			$(this).off("click","span.fileSelect");
			
			$(this).on({ 
				click: function(){
					$(this).toggleClass("selectNow");
					showBar($(this));
					showNumber();
					selectAll();
					delDir();		
				}
			},"span.fileSelect");
			
		},
		mouseout: function(){
			if($(this).find(".fileSelect").hasClass("selectNow")){
			}else{
				$(this).find(".file-icon").removeClass("borderShow");
				$(this).find(".fileSelect").removeClass("selectShow");
			}
		}
	},"div.item");
	
	function getLength(){
		return $(".selectNow").length;	
	}
	
	function showBar(obj){
		
		var $selInfo = $(".selInfo");
		var $buttons = $(".operate").find("a");
		var $rename = $("a:nth-last-of-type(3)", $(".operate"));
		var $fileSelect = $(".item",".container").find(".fileSelect");
		
		if(obj.hasClass("selectNow")){
			$selInfo.show();
			$buttons.show();
			detectBar();
		}else{
			detectBar();
		}
		
	}
	
	function detectBar(){
		
		switch ($(".selectNow").length) {
			case 0 :
				$selInfo.hide();
				$buttons.hide();	
				break;
			case 1 :
				$rename.removeClass("rename");
				rename();
				break;
			default :
				$rename.addClass("rename");
				break;	
		}
			
	}
	
	function showNumber(){
		$selNum.html($(".selectNow").length);
	}
	
	function selectAll(){
				
		if(getLength()!= $(".item").length){
			$selectAll.removeClass("selected");	
		}else{
			$selectAll.addClass("selected");		
		}	
		
	}
	
	setTitle();
	
	function setTitle(){
		$(".item-name").each(function(index, element) {
			$(this).attr("title",$(this).text());
		});
	}
	
	function setHistory(){
		var $history = $(".history-list-tips i");
		$history.html($(".item").length);
	}
	
	function rename(){
				
		$rename.click(function(){
			
			if($(".selectNow").length != 1){
				return;	
			}
			
			var $sib = $(".selectNow").offsetParent().siblings();
			var $name = $sib.find(".item-name");
			var $edit = $sib.find(".edit-name");
			var $icon = $(".selectNow").offsetParent();
			var $Input = $edit.find("input");
			var $ok = $edit.find(".ok");
			var $cancel = $edit.find(".cancel");
						
			$name.hide();
			$edit.show();
			$Input.select();
			var val = $Input.val();
			
			$(document).keydown(function (event) {
				if(event.keyCode == 13){
					var newVal = $Input.val();
					$edit.hide();
					$name.text(newVal).show().attr("title",newVal);
					$(".selectNow").removeClass("selectNow").removeClass("selectShow");	
					$icon.removeClass("borderShow");
					$selNum.html(0);
					setHistory();	
				};
			});
			
			$ok.click(function(){
				
				var newVal = $Input.val();
				$edit.hide();
				$name.text(newVal).show().attr("title",newVal);
				$(".selectNow").removeClass("selectNow").removeClass("selectShow");	
				$selNum.html(0);
				
			})
			
			$cancel.click(function(){
				
				$edit.hide();
				$name.text(val).show().attr("title",val);
				$(".selectNow").removeClass("selectNow");
			})
		})	
	}
	
	(function(){

        // 非Ajax方式

        var $dom;

		$(".switch a:nth-of-type(1)").off("click").on("click",function(){
			$(this).removeClass("list-off").addClass("list-on");
			$(this).siblings().removeClass("table-on").addClass("table-off");

            //$dom = $(".container .wrap").children();
            //$dom.remove();

            //$ajax

			// 加载行样式
			//var $head = $(document).find("head");
			//var $style = $('<link rel="stylesheet" href="css/change.css" type="text/css">');
			//$head.append($style);

            // 重新创建所有元素+编写样式

		});
		
		$(".switch a:nth-of-type(2)").off("click").on("click",function(){//表
			$(this).siblings().removeClass("list-on").addClass("list-off");
			$(this).removeClass("table-off").addClass("table-on");
			// 加载表样式
            //var $head = $(document).find("head");
            //$head.children().last().remove();

            //$(".wrap").append($dom);
		});
			
	})();
	
});