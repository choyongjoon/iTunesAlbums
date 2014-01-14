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
  	$(".album-plate").toggleClass("hidden");
  });
  
  function selectAlbum(albumContainer){
		albumContainer.addClass("selected"); // enlarge album image
		albumContainer.find(".artist-name").addClass("hidden"); // hide artist name
		selectedAlbumContainer = albumContainer;
  };
  
  function unselectAlbum(albumContainer){
	  albumContainer.removeClass("selected"); // reduce album image
		albumContainer.find(".artist-name").removeClass("hidden"); // show artist name
		selectedAlbumContainer = undefined;
  };
  
  function showAlbumPlate(){
	  albumPlate = $(".album-plate");
  	albumPlate.removeClass("hidden");
  	albumPlate.find(".album-plate-arrow").css("left", function(){
    	return albumContainer.offset().left + albumContainer.width()/2 - 17;
  	});
  };
  
  function hideAlbumPlate(){
	  albumPlate = $(".album-plate");
    albumPlate.addClass("hidden");
  };
  
  function changeAlbumPlate(){
	  albumPlate = $(".album-plate");
  	albumPlate.find(".album-plate-arrow").css("left", function(){
    	return albumContainer.offset().left + albumContainer.width()/2 - 17;
  	});
  };
  
});  