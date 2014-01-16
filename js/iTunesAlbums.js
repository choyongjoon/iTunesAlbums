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
	  		hideAlbumPlate();
	  	}else{
				unselectAlbum(selectedAlbumContainer);
				selectAlbum(albumContainer);
				changeAlbumPlate();
	  	}
  	}else{
    	selectAlbum(albumContainer);
    	showAlbumPlate();
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
  
  
  function showAlbumPlate(){
	  albumPlate = $(".album-plate");
  	$(".album-plate-arrow").css("left", function(){
    	return albumContainer.offset().left + albumContainer.width()/2 - 17;
  	});
  	$(".album-plate-arrow").addClass("in");
  	$(".album-plate-arrow-cover").addClass("in");
  	albumPlate.addClass("in");
  };
  function hideAlbumPlate(){
	  albumPlate = $(".album-plate");
	  $(".album-plate-arrow").removeClass("in");
  	$(".album-plate-arrow-cover").removeClass("in");
    albumPlate.removeClass("in");
  };
  
  function changeAlbumPlate(){
	  albumPlate = $(".album-plate");
  	albumPlate.find(".album-plate-arrow").css("left", function(){
    	return albumContainer.offset().left + albumContainer.width()/2 - 17;
  	});
  };
  
});