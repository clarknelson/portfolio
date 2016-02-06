var home = {

  headerHeight: 100,

  createPattern: function(){

    // more options: http://bl.ocks.org/mbostock/5577023
    var colors = [
      'YlOrRd',
      //'YlOrBr',
      //'Greys',
      //'Spectral'
    ];
    var xColor = Math.floor(Math.random() * colors.length);
    console.log();

    var cellSize = 102;
    var pattern = Trianglify({
      // api options
      // http://qrohlf.com/trianglify/
      width: window.innerWidth,
      height: window.innerHeight,
      cell_size: cellSize,
      x_colors: colors[xColor]
    });

    // take out the old canvas
    $("#mainHeader canvas").remove()
    $("#mainHeader").append(pattern.canvas());
  },

  headerScrollListener: function(){
    var _this = this;
    $(window).on('scroll', function(e){
      var vh = Math.floor(window.innerHeight - window.scrollY);
      if (vh > _this.headerHeight){
        $("#mainHeader").css({
          height: vh
        });
      } else {
        $("#mainHeader").css({
          height: _this.headerHeight
        });
      }
    });
  },

  createMenu: function(){
    var mainHeaderMenu = $("#mainHeader .menu--root");
    $(".container section").each(function(i){
      console.log(this.className, this);
      mainHeaderMenu.append("<span data-link='"+i+"'>0"+i+": "+ this.className + "</span>");
    });

    $("#mainHeader .menu span").on('click', function(e){
      var targetSection = $('.container').find("section[data-index=\""+ $(this).data("link") +"\"]");
      $("html,body").animate({scrollTop: targetSection.offset().top - 150});
      console.log(targetSection.offset().top);
      $('.container section').find("[data-index="+ $(this).data("link") +"]")

    });

  },

  contentOpacityScroll: function(){
    $(window).on('scroll', function(e){
      var op = window.scrollY / window.innerHeight;
      if (op <= 1){
        $(".container").css("opacity", op);
        $("#mainHeader .menu").css("opacity", op);
      } else {
        $(".container").css("opacity", 1);
        $("#mainHeader .menu").css("opacity", 1);
      }
    });
  },



  setSectionIndex: function(){
    var index = 0;
    $('.container section').each(function(i){
      if($(this).css('display') === "none"){
        return;
      }
      $(this).find("header h4 span").text("0" + index);
      index++;
    });
  },

  // more user friendly <textarea></textarea>
  // http://stackoverflow.com/questions/6140632/how-to-handle-tab-in-textarea
  convertTab: function(){
    $(".contact textarea").keydown(function(e) {
      if(e.keyCode === 9) { // tab was pressed
        // get caret position/selection
        var start = this.selectionStart;
        var end = this.selectionEnd;

        var $this = $(this);
        var value = $this.val();

        // set textarea value to: text before caret + tab + text after caret
        $this.val(value.substring(0, start)
                    + "\t"
                    + value.substring(end));

        // put caret at right position again (add one for the tab)
        this.selectionStart = this.selectionEnd = start + 1;

        // prevent the focus lose
        e.preventDefault();
      }
    });
  },

  updateContactName: function(){
    $('.contact .name').on('change', function(){
      var newValue = $('.contact textarea').text().replace("John Doe", this.value);
      $('.contact textarea').text(newValue);
    });
  },
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

  resizeListener: function(){
    var _this = this;
    $(window).resize(function(){
      _this.createPattern();
    });
  },


  init: function(){
    // global
    this.setSectionIndex();
    this.resizeListener();

    //header
    this.createPattern();
    this.headerScrollListener();
    this.createMenu();
    this.contentOpacityScroll();

    // contact section
    this.convertTab();
    this.updateContactName();

    //this.flag();
    //this.expandPhoto();
  }
}


$(document).ready(function(){
  home.init();
});
