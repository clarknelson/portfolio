var home = {

  preferedHeaderSize: 80,

  mobile: window.innerWidth <= 800 ? true : false,
  desktop: window.innerWidth > 800 ? true : false,



  createMenu: function(){
    var _this = this;
    var mainMenu = $("#mainMenu .menu__root");
    //mainMenu.append("<span data-link='"+420+"'>Home</span>");

    $(".container section").each(function(i){
      var title = $(this).find("header").html();
      mainMenu.append("<span data-link='"+i+"'>"+ title +"</span>");
    });

    $("#mainMenu span").on('click', function(e){
      var targetSection = $('.container').find("section[data-index=\""+ $(this).data("link") +"\"]");
      var offset = targetSection.offset().top;
      $("html,body").animate({scrollTop: offset});
      //_this.toggleMenu($("#mainMenu .hamburger"));
    });
  },


  addToggleMenuListener: function(){
    var _this = this;
    $("#mainMenu").on('click', function(){
      _this.toggleMenu(this);
    });
  },


  toggleMenu: function(element){
    $(element).toggleClass("is-active");
    $(element).find(".hamburger").toggleClass("is-active");
    $(element).find(".menu__root").toggleClass("closed");
  },

  contentOpacityScroll: function(){
    $(window).on('scroll', function(e){
      var op = window.scrollY / window.innerHeight;
      if (op <= 1){
        $(".container").css("opacity", op);
        $("#mainMenu").css("opacity", op);
      } else {
        $(".container").css("opacity", 1);
        $("#mainMenu").css("opacity", 1);
      }
    });
  },

  hideBlogPosts: function(){
    $(".blog .post").each(function(){
      var $postContent = $(this).find(".post__content");
      var height = $postContent.innerHeight() + 100; // safe buffer

      $postContent.data("contentHeight", height);
      $postContent.toggleClass("hidden");
      $postContent.css("max-height", 0);
    });

    $(".blog .post .post__header").on("click", function(){
      var $postContent = $(this).parent().find(".post__content");
      $postContent.toggleClass("hidden");
      if($postContent.hasClass("hidden")){
        $postContent.css("max-height", 0);
      } else {
        $postContent.css("max-height", $postContent.data("contentHeight"));
      }
    });
  },



  resizeListener: function(){
    var _this = this;
    $(window).resize(function(){
      _this.mobile = window.innerWidth <= 800 ? true : false;
      _this.desktop = window.innerWidth > 800 ? true : false;
    });
  },

  scrollListener: function(){
    var _this = this;
    $(window).on('scroll', function(e){
      _this.showHideJumpDown(window.scrollY);
    });
  },

  showHideJumpDown: function(offset){
    var $jumpDown = $('header.hero .jumpDown');
    if(offset > window.innerHeight){
      $jumpDown.hide();
    } else {
      $jumpDown.show();
    }
  },


  init: function(){
    // global event listeners
    this.resizeListener();
    this.scrollListener();

    // homepage functions
    this.setSectionIndex();
    this.createMenu();
    this.addToggleMenuListener();
    this.contentOpacityScroll();

    // homepage header
    this.jumpDownListener();
    this.hideBlogPosts();
  },

  // helper method for the section headers
  setSectionIndex: function(){
    var index = 0;
    $('.container section').each(function(i){
      if($(this).css('display') === "none"){
        return;
      }
      var $header = $(this).find("header")
      var title = $header.text();
      $header.html("<h4><span>0"+index+" :</span>"+title+"</h4>");
      index++;
    });
  },

  jumpDownListener: function(){
    var _this = this;
    $("header.hero .jumpDown").on('click', function(){
      var offset = $(".container section:first-of-type").offset().top;
      $("html,body").animate({scrollTop: offset});
    });
  },

}


$(document).ready(function(){
  home.init();
});


//this.flag();
//this.expandPhoto();
/*
expandPhoto: function(){
  $(".photo").on('click', function(){
    var $self = $(this);
    if($self.hasClass("active")){
      $self.css({
        height: 102
      });
      $("html,body").animate({
        scrollTop: $self.offset().top - 200
      });
    } else {
      $self.css({
        height: $self.find('img').innerHeight()
      });
    }
    $self.toggleClass("active");
    console.log();

    //console.log();
  });
},
flag: function(){
  $('.credits .flag').on('click', function(){
    $(this).toggleClass('active');
    $(this).toggleClass('inactive');
  });
}, */
