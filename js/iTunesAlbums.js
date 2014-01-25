/*!
 * iTunesAlbums.js
 */

$(document).ready(function() {

	var selectedAlbumContainer;

  $(".img-album").click(function() { // when album image is selected
  	albumContainer = $(this).parent();
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
  
  function selectAlbum(albumContainer){
  	albumContainer.css("padding-top", function(){
  		console.log(20 - albumContainer.width()/2 * 0.14 / 0.86);
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
  
  
  function showAlbumPlate(albumContainer){
	  albumPlate = $(".album-plate");
  	$(".album-plate-arrow").css("left", function(){
    	return albumContainer.offset().left + albumContainer.width()/2 - 10;
  	});
  	arrow = $(".album-plate-arrow");
  	arrowCover = $(".album-plate-arrow").find(".album-plate-arrow-cover");
  	arrow.removeClass("duck");
  	arrow.addClass("open");
  	arrowCover.addClass("open");
  	albumPlate.addClass("open");
  };
  function hideAlbumPlate(albumContainer){
	  albumPlate = $(".album-plate");
	  arrow = $(".album-plate-arrow");
  	arrowCover = $(".album-plate-arrow").find(".album-plate-arrow-cover");
	  arrow.removeClass("open");
  	arrowCover.removeClass("open");
    albumPlate.removeClass("open");
  };
  
  function changeAlbumPlate(albumContainer){
  	currentArrow = $(".album-plate-arrow");
  	altArrow = $(".album-plate-arrow-alt");
  	altArrow.css("left", function(){
    	return albumContainer.offset().left + albumContainer.width()/2 - 10;
  	});
  	altArrow.removeClass("duck");
  	currentArrow.addClass("duck");
  	currentArrow.toggleClass("album-plate-arrow album-plate-arrow-alt");
  	altArrow.toggleClass("album-plate-arrow-alt album-plate-arrow");	
  };
  
  $( window ).resize(function() {
  	// repoisition the album-plate-arrow
		$(".album-plate-arrow").css("left", function(){
			if(selectedAlbumContainer!=undefined){
    		return selectedAlbumContainer.offset().left + selectedAlbumContainer.width()/2 - 10;
    	}
  	});
	});
});