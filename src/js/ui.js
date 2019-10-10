var chagtit = $(".question");
var chagsubmu = $(".answer");

// 이미지 미리 로드
$.fn.preload = function() {
	this.each(function(){
		var img = $(this);
		var dataImg = new Image();
		dataImg.onload = function() {
			img.attr("src", img.attr("data-src"));
		}
		dataImg.src = img.attr("data-src");
	});
	return this;
};

// 사이드 메뉴
function sideMenu(){
	var side = $('.side .menu_list');
	var sideLink = side.find('> li a');
	var sideSubDep = side.find('ul ul');
	var current = $('.menu_title').text().trim();

	side.find(' li a').each(function(){
		(!$(this).next().is('ul')) ? $(this).addClass('depth1') : null;
		(!side.find('li li li a').next().is('ul')) ? side.find('li li li a').removeClass('depth1').addClass('depth3') : null;
	});

	sideLink.each(function() {
		if ( $(this).text() == current || $(this).hasClass('active')) {
			$(this).addClass('active').next().slideDown();
			if ( $(this).parent().parent().size() > 0) {
				$(this).parent().parent().prev('a').addClass('active').next().slideDown();
				$(this).parent().parent().parent().parent().prev('a').addClass('active').next().slideDown();
			}
		}
	});

	//1depth
	side.find('> li > a').on("click", function(){
		if ($(this).hasClass('active')) {
			$(this).toggleClass('active').next("ul").slideUp();
			$(this).parent('li').siblings().find('a').removeClass('active').next("ul").slideUp();
		} else {
			side.find(' li > ul').slideUp();
			$(this).next("ul").slideDown();
			$(this).parent('li').siblings().find('a').removeClass('active on');
			$(this).addClass('active').removeClass('on');
		}
		$(this).next('ul').find('li a').removeClass('active');
	});

	//2depth
	side.find(' li li > a').on("click", function(){
		if ($(this).hasClass('active')) {
			$(this).toggleClass('active').next("ul").slideUp();
			$(this).parent('li').siblings().find('a').removeClass('active').next("ul").slideUp();
			$(this).parents('ul').prev('a').addClass('on');
		} else {
			sideSubDep.slideUp();
			$(this).next("ul").slideDown();
			$(this).parent('li').siblings().find('a').removeClass('active on');
			$(this).parents('ul').prev('a').addClass('on');
			$(this).addClass('active');
		}
	});

	//3depth
	side.find(' li li li > a').on("click", function(){
		$(this).parents('ul').stop();
	});
}

// input 타입 숫자만 입력
function onlyNumber(event){
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if ( (keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ) 
		return;
	else
		return false;
}
function removeChar(event) {
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if ( keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ) 
		return;
	else
		event.target.value = event.target.value.replace(/[^0-9]/g, "");
}

// 수량 감소
function minus(el){
	var expense = $("#" + el);
	var expenseVal = expense.val();
	expenseVal = (Number(expenseVal)-1);
	if(expenseVal >= 0){
		expense.val(expenseVal);
	}
};

// 수량 증가
function plus(el) {
	var expense = $("#" + el);
	var expenseVal = expense.val();
	expenseVal = (Number(expenseVal)+1);
	if(expense.val() <= 100){
		expense.val(expenseVal);
	}
};

// 스크롤 메뉴 이동
function scrollMove(seq){
	var offset = $("#" + seq).offset();
	$('html, body').animate({scrollTop : offset.top}, 400);
}

// 스크롤 top 버튼
function goTop() {
    var settings = {
            button      : '#go_top',
            text        : 'TOP',
            min         : 100,
            fadeIn      : 400,
            fadeOut     : 400,
            scrollSpeed : 800,
            easingType  : 'easeInOutExpo'
        },
        oldiOS     = false,
        oldAndroid = false;

    if( /(iPhone|iPod|iPad)\sOS\s[0-4][_\d]+/i.test(navigator.userAgent) ) { oldiOS = true; }
    if( /Android\s+([0-2][\.\d]+)/i.test(navigator.userAgent) ) { oldAndroid = true; }
    $('body').append('<a href="#" class="sprite_before" id="' + settings.button.substring(1) + '" title="' + settings.text + '">' + '<span>' + settings.text + '</span>' + '</a>');
    $( settings.button ).on('click', function( e ){
        $('html, body').animate({ scrollTop : 0 }, settings.scrollSpeed, settings.easingType );
        e.preventDefault();
    })
    .on('mouseenter', function() {
        $( settings.button ).addClass('hover');
    })
    .on('mouseleave', function() {
        $( settings.button ).removeClass('hover');
    });

    $(window).scroll(function() {
        var position = $(window).scrollTop();
        if( oldiOS || oldAndroid ) {
            $( settings.button ).css({
                'position' : 'absolute',
                'top'      : position + $(window).height()
            });
        }
        if ( position > settings.min ) { $( settings.button ).fadeIn( settings.fadeIn );}
        else { $( settings.button ).fadeOut( settings.fadeOut );  }
    });

}

// 제품 리스트 정렬 변경 (2열/3열/4열)
function listRow(row) {
	$('.product_list').removeClass().addClass('product_list ' + row);
}

// 탭메뉴 
function tab(e, num){
    var num = num || 0;
    var menu = $(e).children();
    var con = $(e+'_con').children();
    var select = $(menu).eq(num);
	var i = num;

    select.addClass('on');
	con.hide();
    con.eq(num).show();

	$('.terms_area .btn_area').css('border','0');
	
    menu.click('a' , function(e){
        if(select!==null){
            select.removeClass("on");
			con.hide();
			chagsubmu.hide();
			chagtit.removeClass('on');
        }

        select = $(this);
        i = $(this).index();

		$('.terms_area .btn_area').css('border-top','2px solid #fab000');
        select.addClass('on');
		con.eq(i).show();

		e.preventDefault;
	});
}

// popup
function layer_open(el, menuNum) {
	var temp = $("#" + el);
	var bg = temp.children().hasClass("bg");

	// setTimeout(function(){

	if($('#'+ el + ' ' + '.' + menuNum)) {
		$('.section .cont').stop().animate({width:"20%"}, 500, 'easeOutCirc');
		$('#'+ el + ' ' + '.' + menuNum).stop().animate({width:"40%"}, 500, 'easeOutCirc').addClass('active on');
		$('.section .cont.active').children('.layer').css('display','none');
	}

	if (temp.is('.no_compare')) {
		temp.fadeOut();
		alert('비교할 선택 상품이 없습니다.\n제품을 추가해 주세요.');
	} else {
		temp.fadeIn();
		$("html").attr("style", "overflow:hidden;");
	}

	var resizeHeight= temp.find('.pop_wrap').css("margin-top", "-" + temp.find('.pop_wrap').outerHeight() / 2 + "px");
	var resizeWidth = temp.find('.pop_wrap').css("margin-left", "-" + temp.find('.pop_wrap').outerWidth() / 2 + "px");

    $('#'+ el + ' ' + '.btn_pop_close' + ',' + '#' + el + ' ' + '.bg').click(function(e) {
        if (bg) {
			temp.fadeOut();
			$('#'+ el + ' ' + '.' + menuNum).removeClass('active on').css('width','20%');
			$('.section .cont').children('.layer').css('display','block');
            $("html").removeAttr("style");
        } else {
			temp.fadeOut();
			$('#'+ el + ' ' + '.' + menuNum).removeClass('active on').css('width','20%');
			$('.section .cont').children('.layer').css('display','block');
            $("html").removeAttr("style");
        }
        e.preventDefault();
	});
	
	$('#'+ el + ' ' + '.btn_close').on('click', function() {
		var list = temp.find('.product_spec_area');
		$(this).parents('.product_spec_area').remove();
		
		if(list.length !== 0 && temp.find('.product_spec_area').is(':visible')){
			temp.removeClass('no_compare');
		} else {
			temp.fadeOut();
			temp.addClass('no_compare');
			$("html").removeAttr("style");
		}

		temp.find('.pop_wrap').css("margin-top", "-" + temp.find('.pop_wrap').outerHeight() / 2 + "px");
		temp.find('.pop_wrap').css("margin-left", "-" + temp.find('.pop_wrap').outerWidth() / 2 + "px");
	});

	resizeHeight;
	resizeWidth;

	// },500);

    $(window).on("resize", function() {
        temp.find('.pop_wrap').css("margin-top", "-" + temp.find('.pop_wrap').outerHeight() / 2 + "px");
		temp.find('.pop_wrap').css("margin-left", "-" + temp.find('.pop_wrap').outerWidth() / 2 + "px");
	});
}

// 파일 업로드
function fileUpLoad(fileTarget,imgTarget) {
	// var fileTarget = $('.filebox .upload-hidden');

    $('#' + fileTarget).on('change', function(){
        if(window.FileReader){
            // 파일명 추출
            var filename = $(this)[0].files[0].name;
        } 

        else {
            // Old IE 파일명 추출
            var filename = $(this).val().split('/').pop().split('\\').pop();
        };

        $(this).siblings('.upload_name').val(filename);
    });

    //preview image 
    // var imgTarget = $('.preview_image .upload-hidden');

    $("#" + imgTarget + " " + ".upload-hidden").on('change', function(){
        var parent = $(this).parent();
		parent.next('.upload_display').remove();
		
        if(window.FileReader){
			
			//image 파일만
            if (!$(this)[0].files[0].type.match(/image\//)) return;
            
            var reader = new FileReader();
            reader.onload = function(e){
				parent.next('.upload_display').remove();
                var src = e.target.result;
				parent.after('<div class="upload_display"><div class="upload_thumb_wrap"><img src="'+src+'" alt="" class="upload_thumb"><span class="close">X</span></div></div>');
			}
			reader.readAsDataURL($(this)[0].files[0]);
        }

        else {
            $(this)[0].select();
            $(this)[0].blur();
            var imgSrc = document.selection.createRange().text;
            parent.after('<div class="upload_display"><div class="upload_thumb_wrap"><img class="upload_thumb"></div></div>');

            var img = $(this).siblings('.upload_display').find('img');
            img[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enable='true',sizingMethod='scale',src=\""+imgSrc+"\")";
		}
		
	});

	$(document).on('click', ".upload_display .close" , function(){
		console.log('aaaa');
		$(this).parents('.upload_display').prev('.preview_image').find('.upload_name').val('');
		$(this).parents('.upload_display').remove();
	});
}

// S:삭제처리예정
// var ns = (document.layers)?true:false;
// var ie = (document.all)?true:false;
// if (ns) document.captureEvents(Event.MOUSEDOWN || Event.CLICK);
// document.onclick = sourcecodeprotect;
// document.onmousedown = sourcecodeprotect;
// function sourcecodeprotect(e){
// 	if (ns&&(e.which==3)) return false;
// 	else if (ie&&(window.event.button==2)) alert('No rightClick22');
// 	else return true;
// }
// document.onkeydown = function(){
// 	if (event.keyCode == 123) {
// 		alert('No rightClick');
// 	}
// }
// function rightClick() {
// 	if ((event.button==2) || (event.button==2)) {
// 		alert('No rightClick');
// 	}
// }
// document.onmousedown = rightClick;
// E:삭제처리예정
	
$(document).ready(function() {
	var d = new Date();
	var currMonth = d.getMonth();
	var currYear = d.getFullYear();
	var startDate = new Date(currYear, currMonth, 1);

	$.datepicker.setDefaults({
		dateFormat: "yy-mm-dd",
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년'
	});
	
      from = $( "#from" )
        .datepicker({
			defaultDate: startDate,
			changeMonth: true,
			showOn: "both",
			buttonImageOnly: true,
			buttonImage: "../image/icon_calendar.png",
			buttonText: "날짜 선택",
			numberOfMonths: 1
		})
		.datepicker("setDate", startDate)
		.on( "change", function() {
			to.datepicker( "option", "minDate", getDate( this ) );
		}),
      to = $( "#to" ).datepicker({
			defaultDate: 'today',
			changeMonth: true,
			showOn: "both",
			buttonImageOnly: true,
			buttonImage: "../image/icon_calendar.png",
			buttonText: "날짜 선택",
			numberOfMonths: 1
	  })
		.datepicker("setDate", 'today')
		.on( "change", function() {
			from.datepicker( "option", "maxDate", getDate( this ) );
		});

    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( element.value );
      } catch( error ) {
        date = null;
      }
 
      return date;
	}

	// MonthPicker 설정
	Date.prototype.yyyymmdd = function() {
		var mm = this.getMonth() + 1;
		var dd = this.getDate();

		return [this.getFullYear(),
			(mm>9 ? '' : '0') + mm,
			(dd>9 ? '' : '0') + dd
		].join('-');
	};

	var schDate = d.yyyymmdd();

	//MonthPicker 옵션
	var currentYear = (d).getFullYear();
	var startYear = currentYear - 20;
	var startMonth = [startYear,'01'].join('-');
	
	monthOptions = {
		pattern: 'yyyy-mm', // Default 'mm/yyyy'
		startYear: startYear,
    	finalYear: currentYear,
		monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
	};
	
	$('#month_from').val(startMonth);
	$('#month_to').val(schDate.substr(0,7));
	$('.monthpicker').monthpicker(monthOptions);
	
	//버튼 클릭시 MonthPicker Show 
	$('.btn_monthpicker').on('click', function () {
		$('.monthpicker').monthpicker('show');
	});

	//이미지 미리로드
	$("img.preload").preload();

	//사이드 메뉴 실행
	sideMenu();

	// 확대 팝업 클릭시
	lightbox.option({
		'showImageNumberLabel': false,
		'disableScrolling': true
	});

	// top버튼 이동
	goTop();

	//사이드 메뉴 접기 / 펼치기
	$(".expand a").click(function(){
		$(this).toggleClass('active');
		if ($(this).hasClass('active')) {
			$('.wrap , .sub_wrap').addClass('expansion');
			$(".side").stop().animate({
				width : "63px"
			},200);
		} else {
			$('.wrap , .sub_wrap').removeClass('expansion');
			$(".side").stop().animate({
				width : "258px"
			},200);
		}
		return false;
	});

	//tooltip
	var title_;
	var class_;
	var imgTag;

	$(".tooltip").hover(function(e) {
		title_ = $(this).attr("title");
		class_ = $(this).attr("class");
		$(this).attr("title","");

		if(class_ == "img"){
			imgTag = "<img src='"+title_+"' width='100px' height:'100px' alt='' />"
		}

		if($(this) != $(".side .menu_list li.tooltip")) {
			$(".expansion").parent().append("<div id='tooltip'></div>");
		} else {
			$("body").append("<div id='tooltip'></div>");
		}

		if (class_ == "img") {
			$("#tooltip").html(imgTag);
			$("#tooltip").css("width","100px");
		} else {
			$("#tooltip").css("width","auto");
			$("#tooltip").text(title_);
		}
		
		var pageX = $(this).width() / 2;
		var pageY = $(this).offset().top - $("#tooltip").innerHeight() - 10;
		var posX = $("#tooltip").innerWidth() / 2;
		
		$("#tooltip").css({left : pageX + "px", top : pageY + "px" , marginLeft: "-"+ posX + "px"}).fadeIn(500);

	}, function() {
		$(this).attr("title", title_);
		$("#tooltip").remove();
	});

    $(".explanation , .txt_ellipsis").ellipsis({
        responsive: true
    });

    $(".go_top").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 500);
        return false;
    });

	// 이용약관 전체보기
	$('.terms_all_view').on('click', function(e){
		$('.terms_area .btn_area').css('border-top','2px solid #fab000');

		if ($('.terms').is(":hidden")) {
			$('.terms').show();
			$(this).text('전체보기 접기');
		} else {
			$(this).text('세부항목 모두보기');
			$('.terms').hide();
			$("html, body").animate({ scrollTop: 0 } ,0);
			$('.terms_area .btn_area').css('border-top','0');
		}
		$('.terms_tab li').removeClass('on');
		e.preventDefault;
	});

	$(".all_check").on('click', function(){ 
		$("input[name=agree]").prop("checked",true);
	});


	chagsubmu.hide();
	chagtit.on("click", function(e) {
		$(".answer:visible").slideUp();
		$(this)
			.next(".answer:hidden")
			.slideDown();
		if ($(this).hasClass("on")) {
			$(this).toggleClass("on");
		} else {
			$(this)
				.addClass("on")
				.siblings()
				.removeClass("on");
		}
		e.preventDefault;
	});

});