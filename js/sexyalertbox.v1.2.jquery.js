/**
 * Sexy Alert Box - for mootools 1.2 - jQUery 1.3
 * @name sexyalertbox.v1.2.js
 * @author Eduardo D. Sada - http://www.coders.me/web-js-html/javascript/sexy-alert-box
 * @version 1.2.1
 * @date 27-Feb-2009
 * @copyright (c) 2009 Eduardo D. Sada (www.coders.me)
 * @license MIT - http://es.wikipedia.org/wiki/Licencia_MIT
 * @example http://www.coders.me/ejemplos/sexy-alert-box/
 * @based in <PBBAcpBox> (Pokemon_JOJO, <http://www.mibhouse.org/pokemon_jojo>)
 * @thanks to Pokemon_JOJO!
 * @features:
 * * Chain Implemented (Cola de mensajes)
 * * More styles (info, error, alert, prompt, confirm)
 * * ESC would close the window
 * * Focus on a default button
*/

/*
Class: SexyAlertBox
	Clone class of original javascript function : 'alert', 'confirm' and 'prompt'

Arguments:
	options - see Options below

Options:
	name - name of the box for use different style
	zIndex - integer, zindex of the box
	onReturn - return value when box is closed. defaults to false
	onReturnFunction - a function to fire when return box value
	BoxStyles - stylesheets of the box
	OverlayStyles - stylesheets of overlay
	showDuration - duration of the box transition when showing (defaults to 200 ms)
	showEffect - transitions, to be used when showing
	closeDuration - Duration of the box transition when closing (defaults to 100 ms)
	closeEffect - transitions, to be used when closing
	onShowStart - a function to fire when box start to showing
	onCloseStart - a function to fire when box start to closing
	onShowComplete - a function to fire when box done showing
	onCloseComplete - a function to fire when box done closing
*/
$(document).ready(function(){
  Sexy.initialize();
});

function valEmail(valor){
    re=/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/
    if(!re.exec(valor))    {
        return false;
    }else{
        return true;
    }
}

jQuery.bind = function(object, method){
  var args = Array.prototype.slice.call(arguments, 2);  
  return function() {
    var args2 = [this].concat(args, $.makeArray( arguments ));  
    return method.apply(object, args2);  
  };  
};  

jQuery.fn.delay = function(time,func){
	return this.each(function(){
		setTimeout(func,time);
	});
};


jQuery.fn.extend({
  $chain : [],
  chain: function(fn) {
    this.$chain.push(fn);
    return this;
  },
  callChain: function(context) {
    return (this.$chain.length) ? this.$chain.pop().apply(context, arguments) : false;
  },
  clearChain: function(){
    this.$chain.empty();
    return this;
  }
});

(function($) {

  Sexy = {
    getOptions: function() {
      return {
        name            : 'SexyAlertBox',
        zIndex          : 65555,
        onReturn        : false,
        onReturnFunction: function(e) {},
        BoxStyles       : { 'width': 500 },
        OverlayStyles   : { 'backgroundColor': '#000', 'opacity': 0.7 },
        showDuration    : 200,
        closeDuration   : 100,
        moveDuration    : 500,
        onCloseComplete : $.bind(this, function() {
          this.options.onReturnFunction(this.options.onReturn);
        })
      };
    },


    initialize: function(options) {
      this.i=0;
      this.options = $.extend(this.getOptions(), options);
			$('body').append('<form><div id="BoxOverlay"></div><div id="'+this.options.name+'-Box"><div id="'+this.options.name+'-InBox"><div id="'+this.options.name+'-BoxContent"><div id="'+this.options.name+'-BoxContenedor"></div></div></div></div></form>');
			
			this.Content    = $('#'+this.options.name+'-BoxContenedor');
			this.Contenedor = $('#'+this.options.name+'-BoxContent');
			this.InBox      = $('#'+this.options.name+'-InBox');
			this.Box        = $('#'+this.options.name+'-Box');
			
			$('#BoxOverlay').css({
        position        : 'absolute',
        top             : 0,
        left            : 0,
				opacity         : this.options.OverlayStyles.opacity,
				backgroundColor : this.options.OverlayStyles.backgroundColor,
				'z-index'       : this.options.zIndex,
        height          : $(document).height(),
				width           : $(document).width()
			}).hide();
			
			this.Box.css({
        display         : 'none',
        position        : 'absolute',
        top             : 0,
        left            : 0,
				'z-index'       : this.options.zIndex + 2,
				width           : this.options.BoxStyles.width + 'px'
			});

      this.preloadImages();

      $(window).bind('resize', $.bind(this, function(){
        if(this.options.display == 1) {
          $('#BoxOverlay').css({
            height          : 0,
            width           : 0
          });
          $('#BoxOverlay').css({
            height          : $(document).height(),
            width           : $(document).width()
          });
          this.replaceBox();
        }
      }));

      this.Box.bind('keydown', $.bind(this, function(obj, event){
        if (event.keyCode == 27){
          this.options.onReturn = false;
          this.display(0);
        }      
      }));

      $(window).bind('scroll', $.bind(this, function(){
        this.replaceBox();
      }));
			
    },

    replaceBox: function() {
      if(this.options.display == 1) {
        
        this.Box.stop();
        
        this.Box.animate({
          left  : ( ($(document).width() - this.options.BoxStyles.width) / 2),
          top   : ( $(document).scrollTop() + ($(window).height() - this.Box.outerHeight()) / 2 )
        }, {
          duration  : this.options.moveDuration,
          easing    : 'easeOutBack'
        });

        $(this).delay(this.options.moveDuration, $.bind(this, function() {
          $('#BoxAlertBtnOk').focus();
          $('#BoxPromptInput').focus();
          $('#BoxConfirmBtnOk').focus();
        }));
      }
    },

    display: function(option) {
      if(this.options.display == 0 && option != 0 || option == 1) {


        if (!$.support.maxHeight) { //IE6
          $('embed, object, select').css({ 'visibility' : 'hidden' });
        }


        this.togFlashObjects('hidden');

        this.options.display = 1;


        $('#BoxOverlay').stop();
        $('#BoxOverlay').fadeIn(this.options.showDuration, $.bind(this, function(){
          this.Box.css({
            display         : 'block',
            left            : ( ($(document).width() - this.options.BoxStyles.width) / 2)
          });
          this.replaceBox();
        }));
      
      } else {

        this.Box.css({
          display         : 'none',
          top             : 0
        });

        this.options.display = 0;

        $(this).delay(500, $.bind(this, this.queue));

        $(this.Content).empty();
        this.Content.removeClass();

        if(this.i==1) {
          $('#BoxOverlay').stop();
          $('#BoxOverlay').fadeOut(this.options.closeDuration, $.bind(this, function(){
            $('#BoxOverlay').hide();
            if (!$.support.maxHeight) { //IE6
              $('embed, object, select').css({ 'visibility' : 'visible' });
            }

            this.togFlashObjects('visible');

            this.options.onCloseComplete.call();
          }));
        }
      }
    },

    messageBox: function(type, message, properties, input) {
        
        $(this).chain(function () {

        properties = $.extend({
          'textBoxBtnOk'        : 'Ok',
		  'textBoxBtnCotizar'   : 'Mostrar Cotización',
          'textBoxBtnCancel'    : 'Cancelar',
          'textBoxInputPrompt'  : null,
          'password'            : false,
          'onComplete'          : function(e) {}
        }, properties || {});

        this.options.onReturnFunction = properties.onComplete;

        this.Content.append('<div id="'+this.options.name+'-Buttons"></div>');
        if(type == 'alert' || type == 'info' || type == 'error')
        {
            $('#'+this.options.name+'-Buttons').append('<input id="BoxAlertBtnOk" type="submit" />');
            
            $('#BoxAlertBtnOk').val(properties.textBoxBtnOk).css({'width':70});
            
            $('#BoxAlertBtnOk').bind('click', $.bind(this, function(){
              this.options.onReturn = true;
              this.display(0);
            }));
                      
            if(type == 'alert') {
              clase = 'BoxAlert';
            } else if(type == 'error') {
              clase = 'BoxError';
            } else if(type == 'info') {
              clase = 'BoxInfo';
            }
            
            this.Content.addClass(clase).prepend(message);
            this.display(1);

        }
        else if(type == 'confirm')
        {

            $('#'+this.options.name+'-Buttons').append('<input id="BoxConfirmBtnOk" type="submit" /> <input id="BoxConfirmBtnCancel" type="submit" />');
            $('#BoxConfirmBtnOk').val(properties.textBoxBtnOk).css({'width':70});
            $('#BoxConfirmBtnCancel').val(properties.textBoxBtnCancel).css({'width':70});

            $('#BoxConfirmBtnOk').bind('click', $.bind(this, function(){
              this.options.onReturn = true;
              this.display(0);
            }));

            $('#BoxConfirmBtnCancel').bind('click', $.bind(this, function(){
              this.options.onReturn = false;
              this.display(0);
            }));

            this.Content.addClass('BoxConfirm').prepend(message);
            this.display(1);
        }
        else if(type == 'prompt')
        {
			
			$('#'+this.options.name+'-Buttons').append('<input id="BoxPromptBtnOk" type="submit" />');
            $('#BoxPromptBtnOk').val(properties.textBoxBtnCotizar).css({'width':150});
			
			this.Content.prepend('<br /><table width="310" border="0"><tr><td>Nombre:&nbsp;</td><td><input placeholder="Nombre Completo o Razón Social" type="text" id="BoxPromptName" required /></td><td><div class="tooltip yellow-tooltip"> <span id="BoxPromptNameSpan"></span></div></td></tr><tr><td>Teléfono:&nbsp;</td><td><input type="tel" placeholder="10 dígitos (con lada)" id="BoxPromptTel" required /></td><td><div class="tooltip yellow-tooltip"> <span id="BoxPromptTelSpan"></span></div></td></tr><tr><td>email:&nbsp;</td><td><input type="email" placeholder="Correo electrónico" id="BoxPromptMail" required /></td><td><div class="tooltip yellow-tooltip"> <span id="BoxPromptMailSpan"></span></div></td></tr></table>');
			
            $('#BoxPromptMail').css({'width':250});
            $('#BoxPromptTel').css({'width':250});
            $('#BoxPromptName').css({'width':250});
			
			$('#BoxPromptName').blur(function() {
				if ($('#BoxPromptName').val().length < 1)
				{
					$('#BoxPromptNameSpan').css('visibility', 'visible');
					$('#BoxPromptNameSpan').text('Este campo no puede quedar vacío.');
				}
				else if ($('#BoxPromptName').val().length < 6)
				{
					$('#BoxPromptNameSpan').css('visibility', 'visible');
					$('#BoxPromptNameSpan').text('Debes escribir tu nombre completo.');
				}
				else
					$('#BoxPromptNameSpan').css('visibility', 'hidden');
					
			});
			
			$('#BoxPromptTel').blur(function() {
				
				var telefono = encodeURIComponent($('#BoxPromptTel').val());
				telefono =  telefono.replace(/%20/gi, "");
				telefono = telefono.replace(/-/gi,'');
				
				if ($('#BoxPromptTel').val().length < 1)
				{
					$('#BoxPromptTelSpan').css('visibility', 'visible');
					$('#BoxPromptTelSpan').text('Este campo no puede quedar vacío.');
				}
				else if (telefono.length != 10 || isNaN(telefono))
				{
					$('#BoxPromptTelSpan').css('visibility', 'visible');
					$('#BoxPromptTelSpan').text('Debes escribir un número telefónico real.');
				}
				else
					$('#BoxPromptTelSpan').css('visibility', 'hidden');
			});
			
			$('#BoxPromptMail').blur(function() {
				if ($('#BoxPromptMail').val().length < 1)
				{
					$('#BoxPromptMailSpan').css('visibility', 'visible');
					$('#BoxPromptMailSpan').text('Este campo no puede quedar vacío.');
				}
				else if (!valEmail($('#BoxPromptMail').val()))
				{
					$('#BoxPromptMailSpan').css('visibility', 'visible');
					$('#BoxPromptMailSpan').text('Debes escribir un correo real.');
				}
				else
					$('#BoxPromptMailSpan').css('visibility', 'hidden');
			});

            $('#BoxPromptBtnOk').bind('click', $.bind(this, function(){
				
				var regresar = new Array();
				regresar[0] = $('#BoxPromptName').val(); 
				regresar[1] = $('#BoxPromptTel').val(); 
				regresar[2] = $('#BoxPromptMail').val();
				
				if (regresar[0] == "" || (regresar[1] == "" && regresar[2] == ""))
				{
					regresar = false;
				}
				
              this.options.onReturn = regresar;
              this.display(0);
            }));

            this.Content.addClass('BoxPrompt').prepend(message + '<br />');
            this.display(1);
           
        }
        else
        {
            this.options.onReturn = false;
            this.display(0);		
        }

      });

      this.i++;

      if(this.i==1) {
        $(this).callChain(this);
      }
    },

    queue: function() {
      this.i--;
      $(this).callChain(this);
    },

    chk: function (obj) {
      return !!(obj || obj === 0);
    },

    togFlashObjects: function(state) {
      var hideobj=new Array("embed", "iframe", "object");
      for (y = 0; y < hideobj.length; y++) {
       var objs = document.getElementsByTagName(hideobj[y]);
       for(i = 0; i < objs.length; i++) {
        objs[i].style.visibility = state;
       }
      }
    },

    preloadImages: function() {
      var img = new Array(2);
      img[0] = new Image();img[1] = new Image();img[2] = new Image();
      img[0].src = this.Box.css('background-image').replace(new RegExp("url\\('?([^']*)'?\\)", 'gi'), "$1");
      img[1].src = this.InBox.css('background-image').replace(new RegExp("url\\('?([^']*)'?\\)", 'gi'), "$1");
      img[2].src = this.Contenedor.css('background-image').replace(new RegExp("url\\('?([^']*)'?\\)", 'gi'), "$1");
    },
    

    /*
    Property: alert
      Shortcut for alert
      
    Argument:
      properties - see Options in messageBox
    */		
    alert: function(message, properties) {
      this.messageBox('alert', message, properties);
    },

    /*
    Property: info
      Shortcut for alert info
      
    Argument:
      properties - see Options in messageBox
    */		
    info: function(message, properties){
      this.messageBox('info', message, properties);
    },

    /*
    Property: error
      Shortcut for alert error
      
    Argument:
      properties - see Options in messageBox
    */		
    error: function(message, properties){
      this.messageBox('error', message, properties);
    },

    /*
    Property: confirm
      Shortcut for confirm
      
    Argument:
      properties - see Options in messageBox
    */
    confirm: function(message, properties){
      this.messageBox('confirm', message, properties);
    },

    /*
    Property: prompt
      Shortcut for prompt
      
    Argument:
      properties - see Options in messageBox
    */	
    prompt: function(message, input, properties){
      this.messageBox('prompt', message, properties, input);
    }

  };

})(jQuery);