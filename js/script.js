$(document).ready(function(){

	var top; // количество прокрученных пикселей
	var sectionCoord = new Array();	// массив пикселей координат местоположения элемента section от верхней границы документа
	var sectionId = new Array();	// массив id section

	// записываем в массивы id и местоположение section от верхней границы документа
	$("section").each(function(index, elem){
		sectionCoord.push(elem.offsetTop);
		sectionId.push(elem.id);
	});

	$(window).scroll(function(){
		top = $(document).scrollTop();	// получаем количество прокрученных пикселей

		// при скролле уменьшаем/увеличиваем навигационное меню
		if( top >= 300 && $(".navbar-default").is(".navbar_scroll") == false && window.innerWidth > 767 ){
			$(".navbar-default").addClass("navbar_scroll");
			$(".navbar-brand").addClass("navbar-brand_scroll");
		}
		else if( top < 300 && $(".navbar-default").is(".navbar_scroll") == true && window.innerWidth > 767 ){
			$(".navbar-default").removeClass("navbar_scroll");
			$(".navbar-brand").removeClass("navbar-brand_scroll");
		}

		// выделяем пункты меню при скроллинге
		for(var i = 0; i < sectionCoord.length; i++){
			if(i != sectionCoord.length-1){
				if( top < sectionCoord[0] && $(".navbar-default .navbar-nav>li>a").is(".active_menu_item") == true ){
					$(".navbar.navbar-default a").removeClass("active_menu_item");
				}
				else if( top >= sectionCoord[i] && top <= sectionCoord[i+1]	&& $(".navbar-default .navbar-nav>li>a[href$='#" + sectionId[i] + "']").is(".active_menu_item") == false ){
					if( $(".navbar-default .navbar-nav>li>a").is(".active_menu_item") )
						$(".navbar.navbar-default a").removeClass("active_menu_item");
					$(".navbar-default .navbar-nav>li>a[href$='#" + sectionId[i] + "']").addClass("active_menu_item");
				}
			}
			else if( top >= sectionCoord[i] && top <= $("footer")[0].offsetTop && $(".navbar-default .navbar-nav>li>a[href$='#" + sectionId[i] + "']").is(".active_menu_item") == false){
				if( $(".navbar-default .navbar-nav>li>a").is(".active_menu_item") )
					$(".navbar.navbar-default a").removeClass("active_menu_item");
				$(".navbar-default .navbar-nav>li>a[href$='#" + sectionId[i] + "']").addClass("active_menu_item");
			}
		}

	});

	// при клике на пункт меню плавно спускаемся в них до нужного блока section
	$(".navbar.navbar-default a").click(function(){
		$("html, body").animate({scrollTop: $($(this).attr("href")).offset().top}, 1000);

		if( $(".navbar-default .navbar-nav>li>a").is(".active_menu_item") )
			$(".navbar.navbar-default a").removeClass("active_menu_item");

		if( $(this)[0].hash != "#page_top" )
			$(this).addClass("active_menu_item");

	});

	// при клике на кнопку вверх плавно перемещаемся на верх
	$(".btn_scroll_top_page").click(function(){
		$("html, body").animate({scrollTop: 0}, 1000);
	});

});
