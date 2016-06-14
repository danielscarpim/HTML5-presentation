$( document ).ready(function() {

	// Variables

	var main = $("#main");
	var tLeft = new TimelineMax({paused:true, align:'start'});
	var tRight = new TimelineMax({paused:true, align:'start'});
	var tTop = new TimelineMax({paused:true, align:'start'});
	var tBottom = new TimelineMax({paused:true, align:'start'});
	var tModal = new TimelineMax({paused:true, align:'start'});


	// Timelines

	tLeft.from($(".left .box"), 0.5, {x:"-200%", ease:Power2.easeOut});
	tLeft.staggerFrom($(".left ul li"), 0.5, {x:"-50%", ease:Power2.easeOut}, 0.1 );
	tLeft.from($(".left .back"), 0.5, {x:"-200%", ease:Power2.easeOut}, "-=0.25");

	tRight.from($(".right .box"), 0.5, {x:"200%", ease:Power2.easeOut});
	tRight.staggerFrom($(".right ul li"), 0.5, {x:"120%", ease:Power2.easeOut}, 0.1 );
	tRight.from($(".right .back"), 0.5, {x:"700%", ease:Power2.easeOut}, "-=0.25");

	tTop.from($(".top .box"), 0.5, {y:"-200%", ease:Power2.easeOut});
	tTop.staggerFrom($(".top ul li"), 0.5, {x:"-80%", ease:Power2.easeOut}, 0.1 );
	tTop.from($(".top .back"), 0.5, {x:"-200%", ease:Power2.easeOut}, "-=0.25");

	
	tBottom.from($(".bottom .box"), 0.5, {y:"200%", ease:Power2.easeOut});
	tBottom.staggerFrom($(".bottom ul li"), 0.5, {x:"-100%", ease:Power2.easeOut}, 0.1 );
	tBottom.from($(".bottom h1"), 0.5, {x:"-100%", ease:Power2.easeOut}, "-=1");
	tBottom.from($(".bottom .back"), 0.5, {x:"-200%", ease:Power2.easeOut}, "-=0.25");

	tModal.from($(".mask"), 0.5, {autoAlpha:0, ease:Power2.easeInOut});
	tModal.from($(".info-box"), 0.5, {y:'-100%', ease:Power2.easeInOut}, "-=0.5");

	// Functions

	function resetview(speed) {
		speed = speed || 0;
		TweenMax.to(window, speed, {scrollTo:{x:main.offset().left, y:main.offset().top}});
		$(".control").removeClass('active');

		tLeft.reverse();
		tRight.reverse();
		tTop.reverse();
		tBottom.reverse();

	}


	function scroll( target ) {
		var scrollTarget = $(target);
		TweenMax.to(window, 1, { scrollTo:{ x:scrollTarget.offset().left, y:scrollTarget.offset().top }, ease:Power2.easeOut });
	}

	function boxScroll( target ) {
		var targetName = target.target;
		var scrollTarget = $("."+targetName);
		TweenMax.to($(".info-container"), 1, { scrollTo:{ x:scrollTarget.position().left}, ease:Power2.easeOut });
	}

	function viewSize() {
		var vWidth = $(window).width();
		var vHeight = $(window).height();

		if(vWidth<vHeight){
			$(".perspective").addClass("vertical");
		} else if (vWidth>vHeight) {
			$(".perspective").removeClass("vertical");
		}

	}


	// Actions
	
	$( ".control" ).click(function(event) {
		event.preventDefault();

		if ($(this).hasClass('active')){
			resetview(1);
		} else {

			var target = $(this).attr('target');
			$(".control").removeClass('active');
			$(this).addClass('active');

			scroll(target);

			switch (true) {
		      case $(this).hasClass('left'):
		        tLeft.play();
		        tRight.reverse();
		        tTop.reverse();
		        tBottom.reverse();
		        break;
		      case $(this).hasClass('right'):
		        tRight.play();
		        tLeft.reverse();
		        tTop.reverse();
		        tBottom.reverse();
		        break;
		      case $(this).hasClass('top'):
		        tTop.play();
		        tRight.reverse();
		        tLeft.reverse();
		        tBottom.reverse();
		        break;
		      case $(this).hasClass('bottom'):
		        tBottom.play();
		        tRight.reverse();
		        tTop.reverse();
		        tLeft.reverse();
		        break;
		    }
		}
	});

	$(".next").click(function(event) {
		boxScroll(event.target.dataset);
	});

	$(".close").click(function(event){
		tModal.reverse();
	});


	$(".back").click(function(event) {
		resetview(1);

	});

	$(".ciclo").click(function(event) {
		resetview(1);
		tModal.play();
	});

	//tModal.play();


	// Window actions
	
	resetview(0);
	viewSize();

	$( window ).resize(function() {
		resetview(0);
		viewSize();
	});
	

});