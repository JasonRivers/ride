// generic jQuery list with accessible selectable items
;(function($){'use strict'
  var L='list'                   // css class
  var S='list-selection'         // css class
  var F='list-focus'             // css class
  var E='list-selection-changed' // event name
  function pg($l){var $c=$('>',$l);return~~($l.height()/($c.eq(1).position().top-$c.position().top))} // page size
  function idx($l){return $('>.'+F,$l).index()} // index of focused item
  var methods={
    init:function(){
      return(this.addClass(L)
        .on('click','>:not(.ui-sortable-helper)',function(e){
          if(e.altKey||e.modKey)return
          var $a=$(this),$l=$a.parent()
          e.ctrlKey&&!e.shiftKey ? $a.toggleClass(S) : $l.list('select',$a.index(),e.ctrlKey,e.shiftKey)
          $l.trigger(E);return!1
        })
        .on('focus','*',function(){$(this).parentsUntil('.'+L).andSelf().eq(0).   addClass(F)})
        .on('blur' ,'*',function(){$(this).parentsUntil('.'+L).andSelf().eq(0).removeClass(F)})
        .keydown(function(e){
          var $l=$(this),ck=e.ctrlKey,sk=e.shiftKey;if(e.altKey||e.modKey)return
          switch(e.which){
            /*C-a */case 65:if(ck){$l.children().addClass(S).eq(0).focus();$l.trigger(E);return!1};break
            /*spc */case 32:$('>.'+F,$l).toggleClass(S);$l.trigger(E);return!1
            /*up  */case 38:case 63232:$l.list('select',idx($l)-1         ,ck,sk);return!1
            /*down*/case 40:case 63233:$l.list('select',idx($l)+1         ,ck,sk);return!1
            /*home*/case 36:case 63273:$l.list('select',0                 ,ck,sk);return!1
            /*end */case 35:case 63275:$l.list('select',$('>',$l).length-1,ck,sk);return!1
            /*pgup*/case 33:case 63276:$l.list('select',idx($l)-pg($l)    ,ck,sk);return!1
            /*pgdn*/case 34:case 63277:$l.list('select',idx($l)+pg($l)    ,ck,sk);return!1
          }
        })
      )
    },
    select:function(i,ctrl,shift){
      return this.each(function(){
        var $l=$(this),$a=$l.children(),n=$a.length
        i=i<0?0:i>=n?n-1:i
        if(!ctrl){$a.removeClass(S).eq(i).addClass(S)}
        if(shift){var an=$l.data('list-anchor')||0,m=i<an?i:an,M=i+an-m;$a.slice(m,M+1).addClass(S)}
        else{$l.data('list-anchor',i)}
        var $f=$a.eq(i),q='a,:input';($f.is(q)?$f:$f.find(q).eq(0)).focus() // q:query for focusable elements
        $(this).trigger(E)
      })
    }
  }
  $.fn.list=function(x){
    if(typeof x!=='string')return methods.init.apply(this,arguments)
    if(methods[x])return methods[x].apply(this,[].slice.call(arguments,1))
    console.error('Method '+x+' does not exist on jQuery.list')
  }
}(jQuery));