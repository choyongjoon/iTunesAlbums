/*!
 * iTunesAlbums.js
 */

/*!
 * util functions
 */

function numAlbumsInRow() {
	var width = $(window).width();
	if (width < 768) { // Extra small devices Phones (<768px)
		return 2;
	} else if (width < 992) { // Small devices Tablets (≥768px)
		return 4;
	} else if (width < 1200) { // Medium devices Desktops (≥992px)
		return 6;
	} else { // Large devices Desktops (≥1200px)
		return 6;
	}
};

function getRowId(albumContainer) {
	var numInRow = numAlbumsInRow();
	//console.log("# albums in a row: " + numAlbumsInRow());
	var selectedRow = parseInt(getId(albumContainer) / numInRow);
	//console.log("selected row: " + selectedRow);
	return selectedRow;
};

function getId(albumContainer) {
	//console.log(albumContainer.parent().parent().find('.col-xs-6').index(albumContainer.parent()));
	return albumContainer.parent().parent().find('.col-xs-6').index(albumContainer.parent());
};


/*!
 * AlbumPlate
 */

(function(doc) {

	var AlbumPlate = {};
	
	AlbumPlate = function(albumPlateContainer) {
		this.container = albumPlateContainer;
		this.albumPlate = albumPlateContainer.find(".album-plate");
		this.arrow = albumPlateContainer.find(".album-plate-arrow");
		this.altArrow = albumPlateContainer.find(".album-plate-arrow-alt");
		this.arrowCover = albumPlateContainer.find(".album-plate-arrow-cover");
	};
	
	AlbumPlate.prototype.arrowPosition = function(albumContainer) {
		return albumContainer.offset().left + albumContainer.width() / 2 - this.container.offset().left - 10;
	};
	
	AlbumPlate.prototype.show = function(albumContainer) {
		var arrow = this.arrow;
		var arrowCover = this.arrowCover;
		
		this.move(albumContainer);
		this.paint(albumContainer);
		arrow.css("left", this.arrowPosition(albumContainer));
		arrowCover.css("left", this.arrowPosition(albumContainer)-1);
		arrow.removeClass("duck");
		arrow.addClass("open");
		arrowCover.addClass("open");
		this.albumPlate.addClass("open");
		this.fill(albumContainer);
	};

	AlbumPlate.prototype.hide = function() {
		this.arrow.removeClass("open");
		this.arrowCover.removeClass("open");
		this.albumPlate.removeClass("open");
	};

	AlbumPlate.prototype.change = function(albumContainer) {
		var currentArrow = this.arrow;
		var altArrow = this.altArrow;
		var arrowCover = this.arrowCover;
		// if selectedAlbumContainer and albumContainer are in a same row;
		this.paint(albumContainer);
		altArrow.css("left", this.arrowPosition(albumContainer));
		arrowCover.css("left", this.arrowPosition(albumContainer)-1);
		altArrow.removeClass("duck");
		currentArrow.addClass("duck");
		// toggle
		currentArrow.toggleClass("album-plate-arrow album-plate-arrow-alt");
		altArrow.toggleClass("album-plate-arrow-alt album-plate-arrow");
		this.altArrow = currentArrow;
		this.arrow = altArrow;
		this.fill(albumContainer);
	};
	
	AlbumPlate.prototype.move = function(albumContainer) {
		var albumPlateContainer = this.container;
		var albumRow = $(".album-row");
		// reposition the album plate after the selected row
		var rowId = getRowId(albumContainer);
		albumPlateContainer.remove();
		var rowEnd = albumRow.find(".clearfix").eq((rowId + 1) * numAlbumsInRow() / 2 - 1);
		//var rowEnd = albumRow.children()[((rowId + 1) * numAlbumsInRow() * 3 / 2) - 1]; // 3/2: consider clearfix
		console.log(rowEnd);
		if (rowEnd.length > 0) {
			albumPlateContainer.insertAfter(rowEnd);
		}else{
			albumPlateContainer.appendTo(albumRow);
		}
	};
	
	AlbumPlate.prototype.paint = function(albumContainer) {
		var albumPlate = this.albumPlate;
		var id = getId(albumContainer);
		// chnage colors
		//console.log(id, this, albumPlate, albumContainer);
		albumPlate.css("background-color", 'rgb(' + albumColors[id].bgColor + ')');
		this.arrow.css("background-color", 'rgb(' + albumColors[id].bgColor + ')');
		this.altArrow.css("background-color", 'rgb(' + albumColors[id].bgColor + ')');
		albumPlate.find(".album-plate-img-wrap").css("box-shadow", "inset 16px 16px 25px " + 'rgb(' + albumColors[id].bgColor + ')');
		albumPlate.find(".first-color").css("color", 'rgb(' + albumColors[id].secondaryColor + ')');
		albumPlate.find(".second-color").css("color", 'rgb(' + albumColors[id].primaryColor + ')');
	};

	AlbumPlate.prototype.fill = function(albumContainer) {
		var image = albumContainer.find(".img-album")
		var imageSrc = image.attr("src");
		var albumPlate = this.albumPlate;
		// change text
		albumPlate.find(".ap-album-name").text(albumContainer.find(".album-name").text());
		albumPlate.find(".ap-artist-name").text(albumContainer.find(".artist-name").text());
		albumPlate.find(".ap-album-review").html(albumContainer.find(".album-review ").html());
		// chnage image
		albumPlate.find(".album-plate-img").attr("src", image.attr("src"));
	};
	
	this.AlbumPlate = AlbumPlate;
	
}(document));


var selectedAlbumContainer;
var albumColors;
var windowWidth = $(window).width();
var albumPlate = new AlbumPlate($(".album-plate-container"));
var albumPlateAlt = new AlbumPlate($(".album-plate-container-alt"));	

$(document).ready(function() {

	// resize the height
	$(".album-container").css("height", function() {
		return $(this).find(".img-album").width() + 69;
	});	
	
	// on click function
	$(".img-album").click(function() { // when album image is selected
		var albumContainer = $(this).parent().parent();
		if (selectedAlbumContainer != undefined) {
			if (selectedAlbumContainer.is(albumContainer)) {
				unselectAlbum(albumContainer);
				selectedAlbumContainer = undefined;
				albumPlate.hide();
			} else {
				unselectAlbum(selectedAlbumContainer);
				selectAlbum(albumContainer);
				if(getRowId(albumContainer)==getRowId(selectedAlbumContainer)){
					selectedAlbumContainer = albumContainer;
					albumPlate.change(albumContainer);
				}else{
					albumPlate.hide();
					albumPlateAlt.show(albumContainer);
					
					albumPlate.container.toggleClass("album-plate-container album-plate-container-alt");
					albumPlateAlt.container.toggleClass("album-plate-container-alt album-plate-container");
					
					albumPlate = new AlbumPlate($(".album-plate-container"));
					albumPlateAlt = new AlbumPlate($(".album-plate-container-alt"));
					
					selectedAlbumContainer = albumContainer;
				}
			}
		} else {
			selectAlbum(albumContainer);
			selectedAlbumContainer = albumContainer;
			albumPlate.show(albumContainer);
		}
	});
	$(document).on("click", ".close-button", function() {
		unselectAlbum(selectedAlbumContainer);
		selectedAlbumContainer = undefined;
		albumPlate.hide();
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
	$.getJSON("json/color.json", function(data) {
		albumColors = data.albumColors
	});
});

// album size control at select/unselect
function selectAlbum(albumContainer) {
	var halfExtent = albumContainer.find(".img-album").width() / 2 * 0.14 / 0.86;
	albumContainer.find(".album-name").css("padding-top", halfExtent);
	albumContainer.addClass("selected"); // enlarge album image
	albumContainer.find(".img-album").addClass("selected");
	albumContainer.find(".album-name").addClass("selected");
	albumContainer.find(".artist-name").addClass("selected"); // hide artist name
};

function unselectAlbum(albumContainer) {
	albumContainer.find(".album-name").css("padding-top", 0);
	albumContainer.removeClass("selected"); // reduce album image
	albumContainer.find(".img-album").removeClass("selected"); // enlarge album image
	albumContainer.find(".album-name").removeClass("selected");
	albumContainer.find(".artist-name").removeClass("selected"); // show artist name
};



// on resize 
$(window).resize(function() {
	// only check horizontal resize
	if ($(window).width() == windowWidth) return;
	windowWidth = $(window).width();
	// repoisition the album-plate-arrow
	if (selectedAlbumContainer != undefined) {
		albumPlate.arrow.css("left", albumPlate.arrowPosition(selectedAlbumContainer));
		albumPlateAlt.arrow.css("left", albumPlateAlt.arrowPosition(selectedAlbumContainer));
		albumPlate.arrowCover.css("left", albumPlate.arrowPosition(selectedAlbumContainer));
		albumPlateAlt.arrowCover.css("left", albumPlateAlt.arrowPosition(selectedAlbumContainer));
	}
	// reposition album plate
	if (selectedAlbumContainer != undefined) {
		albumPlate.move(selectedAlbumContainer);
	}
	// resize the height
	$(".album-container").css("height", function() {
		return $(this).find(".img-album").width() + 69;
	});
	/*$(".img-album").css("margin-top", function() {
		if ($(this).width() > $(this).height()) {
			return $(this).width() - $(this).height();
		} else {
			return 0;
		}
	});*/
});
