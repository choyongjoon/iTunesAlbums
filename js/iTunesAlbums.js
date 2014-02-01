/*!
 * iTunesAlbums.js
 */
var selectedAlbumContainer;
var albumColors;
var windowWidth = $(window).width(); 



$(document).ready(function() {

	// resize the height
	$(".album-container").css("height", function(){
		return $(this).find(".img-album").width() + 69;
	});
	$(".img-album").css("margin-top", function(){
		if($(this).width() == $(this).height()){
			return 0;
		}else if($(this).width() > $(this).height()){
			return $(this).width() - $(this).height();
		}else{
			$(this).css("height", $(this).width());
			return 0;
		}
	});
	
	// on click function
  $(".img-album").click(function() { // when album image is selected
  	var albumContainer = $(this).parent();
  	//console.log(selectedAlbumContainer);
  	//console.log(albumContainer);
  	if(selectedAlbumContainer!=undefined){
	  	if(selectedAlbumContainer.is(albumContainer)){
	  		unselectAlbum(albumContainer);
	  		selectedAlbumContainer = undefined;
	  		hideAlbumPlate(albumContainer);
	  	}else{
				unselectAlbum(selectedAlbumContainer);
				selectAlbum(albumContainer);
				selectedAlbumContainer = albumContainer;
				changeAlbumPlate(albumContainer);
	  	}
  	}else{
    	selectAlbum(albumContainer);
    	selectedAlbumContainer = albumContainer;
    	showAlbumPlate(albumContainer);
		}
  });
  
  $(".close-button").click(function() {
  	unselectAlbum(selectedAlbumContainer);
  	selectedAlbumContainer = undefined;
		hideAlbumPlate();
  });
  /*
  var numAlbums = $(".img-album").length; 
  albumColors = new Array();
  for(var i=0; i<numAlbums; i++){
  	var imgSrc = $(".img-album")[i].src;
	  ImageAnalyzer(imgSrc, function(bgColor, primaryColor, secondaryColor, detailColor) {
	  	var colors = new Object();
      colors.bgColor = bgColor;
      colors.primaryColor = primaryColor;
      colors.secondaryColor = secondaryColor;
      colors.detailColor = detailColor;
      albumColors.push(colors);
		}); 
  }
  */
  
  $.getJSON( "json/color.json", function( data ) {
		albumColors = data.albumColors
	});
});

// album size control at select/unselect

function selectAlbum(albumContainer){
	var halfExtent = albumContainer.find(".img-album").width()/2 * 0.14 / 0.86;
	albumContainer.find(".album-name").css("padding-top", halfExtent);
	//var height = albumContainer[0].offsetHeight; // Forces a repaint in most browsers (apparently).
	albumContainer.addClass("selected"); // enlarge album image
	albumContainer.find(".img-album").addClass("selected");
	albumContainer.find(".album-name").addClass("selected"); 
	albumContainer.find(".artist-name").addClass("selected"); // hide artist name
};

function unselectAlbum(albumContainer){
	albumContainer.find(".album-name").css("padding-top", 0);
  albumContainer.removeClass("selected"); // reduce album image
  albumContainer.find(".img-album").removeClass("selected"); // enlarge album image
  albumContainer.find(".album-name").removeClass("selected");
	albumContainer.find(".artist-name").removeClass("selected"); // show artist name
};

// album plate control

function showAlbumPlate(albumContainer){
  var albumPlate = $(".album-plate");
  var arrow = $(".album-plate-arrow");
	var arrowCover = $(".album-plate-arrow").find(".album-plate-arrow-cover");
	
	moveAlbumPlate(albumContainer);
	paintAlbumPlate(albumContainer);
	
	arrow.css("left", arrowPosition(albumContainer));

	arrow.removeClass("duck");
	arrow.addClass("open");
	arrowCover.addClass("open");
	albumPlate.addClass("open");
};

function hideAlbumPlate(albumContainer){
  var albumPlate = $(".album-plate");
  var arrow = $(".album-plate-arrow");
	var arrowCover = $(".album-plate-arrow").find(".album-plate-arrow-cover");
	
  arrow.removeClass("open");
	arrowCover.removeClass("open");
  albumPlate.removeClass("open");
};

function changeAlbumPlate(albumContainer){
	var currentArrow = $(".album-plate-arrow");
	var altArrow = $(".album-plate-arrow-alt");
	
	// if selectedAlbumContainer and albumContainer are in a same row;
	paintAlbumPlate(albumContainer);
	altArrow.css("left", arrowPosition(albumContainer));
	altArrow.removeClass("duck");
	currentArrow.addClass("duck");
	currentArrow.toggleClass("album-plate-arrow album-plate-arrow-alt");
	altArrow.toggleClass("album-plate-arrow-alt album-plate-arrow");
	
	// else if selectedAlbumContainer and albumContainer are in different rows;
	// TODO
	
};

function moveAlbumPlate(albumContainer){
  var albumPlateContainer = $(".album-plate-container");
  var albumRow = $(".album-row");
  
  // reposition the album plate after the selected row
	var rowId = getRowId(albumContainer);
	albumPlateContainer.remove();
	var rowEnd = albumRow.children()[((rowId+1) * numAlbumsInRow() * 3/2)-1]; // 3/2: consider clearfix
	if(rowEnd==undefined){
  	albumPlateContainer.appendTo(albumRow);
	}
	albumPlateContainer.insertAfter(rowEnd);
}
  
function paintAlbumPlate(albumContainer){
	var image = albumContainer.find(".img-album")
	var imageSrc = image.attr("src");
  var albumPlate = $(".album-plate");
  var id = getId(albumContainer);
  
  // change text
  albumPlate.find(".album-name").text(albumContainer.find(".album-name").text());
	albumPlate.find(".artist-name").text(albumContainer.find(".artist-name").text());
  
  // chnage image
	albumPlate.find(".album-plate-img").attr("src", image.attr("src"));
  
  // chnage colors
  albumPlate.css("background-color", 'rgb(' + albumColors[id].bgColor + ')');
	$(".album-plate-arrow").css("background-color", 'rgb(' + albumColors[id].bgColor + ')');
	$(".album-plate-arrow-alt").css("background-color", 'rgb(' + albumColors[id].bgColor + ')');
	albumPlate.find(".album-plate-img-wrap").css("box-shadow", "inset 16px 16px 25px " + 'rgb(' + albumColors[id].bgColor + ')');
	
	albumPlate.find(".first-color").css("color",'rgb(' + albumColors[id].secondaryColor + ')');
	albumPlate.find(".second-color").css("color", 'rgb(' + albumColors[id].primaryColor + ')');
}

function arrowPosition(albumContainer){
	var albumPlateContainer = $(".album-plate-container");
	return albumContainer.offset().left + albumContainer.width()/2 - albumPlateContainer.offset().left - 10;
}


// on resize 
$( window ).resize(function() {
	// only check horizontal resize
	if($(window).width()==windowWidth) return;
	windowWidth = $(window).width();
	// repoisition the album-plate-arrow
	if(selectedAlbumContainer!=undefined){
		$(".album-plate-arrow").css("left", arrowPosition(selectedAlbumContainer));
	}
	// reposition album plate
	if(selectedAlbumContainer!=undefined){
		moveAlbumPlate(selectedAlbumContainer);
	}
	// resize the height
	$(".album-container").css("height", function(){
		return $(this).find(".img-album").width() + 69;
	});
	
	$(".img-album").css("margin-top", function(){
		if($(this).width() > $(this).height()){
			return $(this).width() - $(this).height();
		}else{
			return 0;
		}
	});
});


function numAlbumsInRow(){
	var width = $( window ).width();
	if(width < 768){ 				// Extra small devices Phones (<768px)
		return 2;
	}else if(width < 992){ 	// Small devices Tablets (≥768px)
		return 4;
	}else if(width < 1200){	// Medium devices Desktops (≥992px)
		return 6;
	}else{									// Large devices Desktops (≥1200px)
		return 6;
	}
}

function getRowId(albumContainer){
	var numInRow = numAlbumsInRow();
	//console.log("# albums in a row: " + numAlbumsInRow());
	var selectedRow = parseInt(albumContainer.parent().index() / (numInRow * 3/2)); // 3/2: consider clearfix
	//console.log("selected row: " + selectedRow);
	return selectedRow;
}

function getId(albumContainer){
	return parseInt(albumContainer.parent().index() / 3) * 2 + albumContainer.parent().index() % 3;
}