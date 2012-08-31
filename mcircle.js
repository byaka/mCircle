/****************************************/
/***********mCircle 0.10*****************/
/*******************| ||*****************/
/*******************| |bug fix***********/
/*******************| new functions******/
/*******************global version*******/ 
/****************************************/
/*********Copyright 2012, BYaka**********/
/*******Email: byaka.life@gmail.com******/
/*********Licensed with GNU GPL**********/
/****************************************/
var mCircle=function(obj){
   $.each(obj,function(i,o){
      var s={'type':$(o).attr('type')||'menu', 'radius':$(o).attr('radius')||'100'};
      var items=$(o).hide().children(mCircle.class.item);
      var r=parseInt(s.radius), da=360/items.length, hw=$(items).width()/2, hh=$(items).height()/2, a=90;
      $(items).attr('mci_x0',r-hw).attr('mci_y0',r-hh);
      for(var i=0,l=items.length;i<l;i++){
         var x=r+Math.round(r*Math.cos(a*deg2rad))-hw;
         var y=r-Math.round(r*Math.sin(a*deg2rad))-hh;
         a+=da;
         $(items[i]).attr('mci_x1',x).attr('mci_y1',y);
      }
      var n='mcrcl'+Math.floor(Math.random()*65536);
      while(mCircle.all[n]) n='mcrcl'+Math.floor(Math.random()*65536);
      $(o).attr('uid',n);
      mCircle.all[n]={'selected':''};
      $(o).on('mouseenter',mCircle.class.item,function(e){
         if(!$(this).hasClass('opened')) return;
         var uid=$(this).parent().attr('uid');
         if(!mCircle.all[uid]) return;
         mCircle.all[uid].selected=$(this);
      })
      $(o).on('mouseleave',mCircle.class.item,function(e){
         if(!$(this).hasClass('opened')) return;
         var uid=$(this).parent().attr('uid');
         if(!mCircle.all[uid]) return;
         mCircle.all[uid].selected='';
      })
   })
   return mCircle;
}

mCircle.class={'item':'.mcirclei'};
mCircle.all={};

mCircle.mouseUp=function(e){
   if(e.button!==1) return;
   $(window).off('mouseup',mCircle.mouseUp);
   e.preventDefault;
   mCircle.hide(e.data.obj,e.data.cb);
   return false;
}

mCircle.show=function(obj,p,callback){
   p=p||{'speed':500,'left':300,'top':300}
   var s={'type':$(obj).attr('type')||'menu', 'radius':$(obj).attr('radius')||'100'};
   var uid=$(obj).attr('uid');
   mCircle.all[uid].selected='';
   var items=$(obj).children(mCircle.class.item), r=parseInt(s.radius);
   $(items).removeClass('opened').css({'left':$(items).attr('mci_x0')+'px','top':$(items).attr('mci_y0')+'px','opacity':'0'});
   $(obj).css({'left':p.left-r,'top':p.top-r}).show();
   for(var i=0,l=items.length;i<l;i++)
      $(items[i]).animate({'left':$(items[i]).attr('mci_x1'),'top':$(items[i]).attr('mci_y1'),'opacity':0.85},p.speed,function(){$(this).addClass('opened')});
   $(window).on('mouseup',{'obj':obj,'cb':callback},mCircle.mouseUp);
   return mCircle;
};

mCircle.hide=function(obj,callback){
   var uid=$(obj).hide().attr('uid');
   if(callback) callback(mCircle.all[uid].selected);
   return mCircle;
};