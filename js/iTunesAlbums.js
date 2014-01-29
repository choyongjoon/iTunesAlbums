/*!
 * iTunesAlbums.js
 */

var windowWidth = $(window).width(); 
var selectedAlbumContainer;

$(document).ready(function() {
	
	// on click function
  $(".img-album").click(function() { // when album image is selected
  	var albumContainer = $(this).parent();
  	//console.log(selectedAlbumContainer);
  	//console.log(albumContainer);
  	if(selectedAlbumContainer!=undefined){
	  	if(selectedAlbumContainer.is(albumContainer)){
	  		unselectAlbum(albumContainer);
	  		hideAlbumPlate(albumContainer);
	  	}else{
				unselectAlbum(selectedAlbumContainer);
				selectAlbum(albumContainer);
				changeAlbumPlate(albumContainer);
	  	}
  	}else{
    	selectAlbum(albumContainer);
    	showAlbumPlate(albumContainer);
		}
  });
  
  $(".close-button").click(function() {
  	unselectAlbum(selectedAlbumContainer);
		hideAlbumPlate();
  });
}); 


// album size control at select/unselect

function selectAlbum(albumContainer){
	albumContainer.css("padding-top", function(){
		//console.log(20 - albumContainer.width()/2 * 0.14 / 0.86);
		return (20 - albumContainer.width()/2 * 0.14 / 0.86);
	});
	//var height = albumContainer[0].offsetHeight; // Forces a repaint in most browsers (apparently).
	albumContainer.addClass("selected"); // enlarge album image
	albumContainer.find(".artist-name").addClass("transparent"); // hide artist name
	selectedAlbumContainer = albumContainer;
};

function unselectAlbum(albumContainer){
	albumContainer.css("padding-top", function(){
		return 20;
	});
  albumContainer.removeClass("selected"); // reduce album image
	albumContainer.find(".artist-name").removeClass("transparent"); // show artist name
	selectedAlbumContainer = undefined;
};

// album plate control

function showAlbumPlate(albumContainer){
  var albumPlate = $(".album-plate");
  var arrow = $(".album-plate-arrow");
	var arrowCover = $(".album-plate-arrow").find(".album-plate-arrow-cover");
	
	moveAlbumPlate(albumContainer);
	
	arrow.css("left", function(){
  	return albumContainer.offset().left + albumContainer.width()/2 - 10;
	});
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
	
	altArrow.css("left", function(){
  	return albumContainer.offset().left + albumContainer.width()/2 - 10;
	});
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


// on resize 
$( window ).resize(function() {
	// only check horizontal resize
	if($(window).width()==windowWidth) return;
	windowWidth = $(window).width();
	// repoisition the album-plate-arrow
	$(".album-plate-arrow").css("left", function(){
		if(selectedAlbumContainer!=undefined){
  		return selectedAlbumContainer.offset().left + selectedAlbumContainer.width()/2 - 10;
  	}
	});
	if(selectedAlbumContainer!=undefined){
		moveAlbumPlate(selectedAlbumContainer);
	}
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