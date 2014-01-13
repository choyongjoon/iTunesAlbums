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
	  		$(".album-plate").addClass("hidden");
	  	}else{
				unselectAlbum(selectedAlbumContainer);
				selectAlbum(albumContainer);
	  	}
  	}else{
    	selectAlbum(albumContainer);
    	$(".album-plate").removeClass("hidden");
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
  
});  