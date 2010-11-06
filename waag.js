// Add loader and include CSS
(function(){
  var l = document.createElement('link'); l.rel = 'stylesheet'; l.media = 'screen'; l.type='text/css'; l.href='http://pangolin.sktsoft.com/uiuc/iea.css'; l.id="iea-css";
  (document.getElementsByTagName('head')[0] || document.body).appendChild(l);

  l = document.createElement('link'); l.rel = 'stylesheet'; l.media = 'print'; l.type='text/css'; l.href='http://pangolin.sktsoft.com/uiuc/print.css';
  (document.getElementsByTagName('head')[0] || document.body).appendChild(l); l.id="iea-print-css";

  l = document.createElement('link'); l.rel = 'stylesheet'; l.media = 'screen'; l.type='text/css'; l.href='http://pangolin.sktsoft.com/uiuc/jquery-ui-1.8.6.custom.css';
  (document.getElementsByTagName('head')[0] || document.body).appendChild(l);

  window.WAAG = {};
})();

(function(){
if(window.jQuery === undefined || window.jQuery.fn.jquery != '1.4.2')
{
  if( window.jQuery != undefined )
    window.jQueryBackup = window.jQuery.noConflict(true);

  var s = document.createElement('script');
  s.setAttribute('type','text/javascript');
  s.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.js');
  s.onload = loadjQueryUI;
  s.onreadystatechange = function ()
  { // Same thing but for IE
    if (this.readyState == 'complete' || this.readyState == 'loaded')
      loadjQueryUI();
  };
  // Try to find the head, otherwise default to the documentElement
  (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(s);
}
else
{
  // The jQuery version on the window is the one we want to use
  loadjQueryUI();
}

function loadjQueryUI()
{
  if( !jQuery.ui || jQuery.ui.version != '1.8.4' )
  {
    var s = document.createElement('script');
    s.setAttribute('type','text/javascript');
    s.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/jquery-ui.js');
    s.onload = loadPlugins;
    s.onreadystatechange = function ()
    { // Same thing but for IE
      if (this.readyState == 'complete' || this.readyState == 'loaded')
        loadPlugins();
    };
    // Try to find the head, otherwise default to the documentElement
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(s);
  }
  else
    loadPlugins();
};

function loadPlugins()
{
  var s = document.createElement('script');
  s.setAttribute('type','text/javascript');
  var ut = Math.round(new Date().getTime() / 1000);
  s.setAttribute('src', 'http://pangolin.sktsoft.com/uiuc/plugins.js?'+ut);
  s.onload = init;
  s.onreadystatechange = function ()
  { // Same thing but for IE
    if (this.readyState == 'complete' || this.readyState == 'loaded')
      init();
  };
  // Try to find the head, otherwise default to the documentElement
  (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(s);
};

function init()
{
  function isArray(o)
  {
   if( o.constructor.toString().indexOf("Array") == -1 ) return false;
   else return true;
  }

  window.WAAG = {
    $: window.jQuery
   ,building_to_long: function( building_short )
    {
      var buildings = { 
        EVRT:'Everitt Laboratory'
       ,MSEB:'Material Sciences E   ngineering Building'
       ,SIEBL:'Siebel Center'
       ,DCL:'Digital Computing Laboratory'
       ,HAB:'Henry Administration Building'
      };

      return buildings[building_short];
    }

   ,json_encode: function( obj )
    {
      var s = '';
      if( isArray(obj) ) s = '[';
      else s = '{';
      
      for( x in obj )
      {
        if( isArray(obj[x]) )
          s+= WAAG.json_encode(obj[x])+', ';
        else if( typeof(obj[x]) == 'object' && obj[x] !== null ) 
          s+= x + ":"+WAAG.json_encode(obj[x])+"',";
        else
          s += x + ": '"+obj[x]+"', "; 
      }
      s = s.substr(0,s.length-2);

      if( isArray(obj) ) s += ']';
      else s += '}';

      return s;
    }
  };


  WAAG.run = function()
  {
    var tbody = null;
    var courses = {};
    var course = '';
    var i,j,k,x = 0;
    var a = [];
    var b = '';
    var parts = [];
    var startAMPM = '';
    var endAMPM = '';
    var startHour = '';
    var endHour = '';
    var startMinute = '';
    var endMinute = '';
    var totalMinutes = 0;
    var iDay = 0; // 0 = Monday, 1 = Tuesday ... 6 = Sunday
    var p = null;
    var oDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    var oDaySchedule = [ [], [], [], [], [] ];
    var courseIndices = [];
     
    var tds = null;
    var minTime,maxTime = '';
    var minHour = 0;
    var maxHour = 0;
    var h = 0;
    var AMPM = '';


    var $table = $copyTable = WAAG.$('table.datadisplaytable')
    // Get all the data
    var dataSpace = $('tr td.ddlabel');
    $table.html('');

    dataSpace.each(function(i)
    {
      l = $(this).children('a');

      a = (l.html()).split('<br>');
      course = a[0].split('-')[0].replace(' ','');

      if( courses[course] === undefined )
      {
        j = 0;
        courses[course] = [];
        courses[course][j] = {};
        k = courseIndices.push(course);
        k -= 1;
      }
      else
     {
       j = courses[course].push({});
       j -= 1;

       for( x in courseIndices )
       {
         if( courseIndices[x] == course )
         {
           k = x;
           break;
         }
       }
     } 

     for( x in a )
     {
       switch(x)
       {
         case '0':
           courses[course][j]['course'] = a[x].split('-')[0];
           courses[course][j]['section'] = a[x].split('-')[1];;
         break;

         case '1':
           courses[course][j]['CRN'] = a[x].split(' ')[0];
         break;

         case '2':
           // Calculate the duration of each class
           start = a[x].split('-')[0];
           end = a[x].split('-')[1];

           startAMPM = start.split(' ')[1];
           endAMPM = end.split(' ')[1];

           startTime = start.split(' ')[0];
           endTime = end.split(' ')[0];

           startHour = startTime.split(':')[0];
           startMinute = startTime.split(':')[1];

           endHour = endTime.split(':')[0];
           endMinute = endTime.split(':')[1];
           
           if( startAMPM == 'pm' && startHour != '12' )
             start24Hour = parseInt(startHour) + 12;
           else if( startHour == '12' && startAMPM == 'am' )
             start24Hour = 0;
           else
             start24Hour = startHour;

           if( endAMPM == 'pm' && endHour != '12' )
             end24Hour = parseInt(endHour) + 12;
           else if( endHour == '12' && endAMPM == 'am' )
             end24Hour = 0;
           else
             end24Hour = endHour;

           totalMinutes = (60*parseInt(end24Hour) + parseInt(endMinute)) - (60*parseInt(start24Hour) + parseInt(startMinute) ); 

           courses[course][j]['duration'] = totalMinutes;
           courses[course][j]['time_start'] = startHour+':'+startMinute+' '+startAMPM;
           courses[course][j]['time_end'] = endHour+':'+endMinute+' '+endAMPM;
           courses[course][j]['time_24_start'] = start24Hour+':'+startMinute;
           courses[course][j]['time_24_end'] = end24Hour+':'+endMinute;

           if( i == 0 )
             minTime = courses[course][j]['time_24_start'];
           else if( i == dataSpace.length-1 )
             maxTime = courses[course][j]['time_24_end'];
         break;

         case '3':
           shortB = a[x].split(' ')[0];
           if( shortB[0] == '1')
             shortB = shortB.split('1')[1];

           courses[course][j]['building_long'] = WAAG.building_to_long(shortB);
           courses[course][j]['building_short'] = shortB;

           courses[course][j]['room'] = a[x].split(' ')[1];
         break;

         default:
           //console.log('Default', x);
       }
     }

     // Determine which day each class is held
     p = $(this).parent();
     tds = p.children('td');
     for( x in tds )
     {
       if( tds[x] == this )
       {
         courses[course][j]['day'] = oDays[x];
         courses[course][j]['day_num'] = x;
         oDaySchedule[x].push(courses[course][j]);
         break;
       }
     }

     minHour = minTime.split(':')[0];      
     maxHour = maxTime.split(':')[0];

     curHour = courses[course][j]['time_24_start'].split(':')[0];
     minOffset = courses[course][j]['time_24_start'].split(':')[1];

     courses[course][j]['html'] = ''
     +'<div id="'+course+j+'" onclick="WAAG.showDetails(\''+course+'\','+j+');" style="height:'+courses[course][j]['duration']+';top: '+parseInt((curHour-minHour)*60+parseInt(minOffset))+'px" class="class course'+k+'">'+courses[course][j]['course']
       +'<br><span title="'+courses[course][j]['building_long']+'">'+courses[course][j]['building_short']+' '+courses[course][j]['room']+'</span>'
       +'<br>'+courses[course][j]['time_start']+' - '+courses[course][j]['time_end']
       //+ '<br><a id="'+course+j+'" href="#TB_inline?height=500&width=600&inlineId=showDetails'+course+'&modal=true" class="thickbox">Show</a>'
       //+ '<div style="display:none;" id="showDetails'+course+'">'
       //+ '  <p><input type="button" onclick="tb_remove(); return false;" value="close"></p>'
       //+ '</div>'
       //+ '  <a onclick="showDetails(\''+course'\'); return false" href="">Show</a>'
     +'</div>';
    });

    WAAG.courses = courses; // Update the object

    $table.append('<thead><tr><th></th><th>Monday</th><th class="gray">Tuesday</th><th>Wednesday</th><th class="gray">Thursday</th><th>Friday</th></tr></head>');

    //tbody = '<tbody><tr><th><p>'+minTime.split(':')[0]+':00</p></th>';
    tbody = '<tbody><tr id="courses"><th>';
    h = 0;
    AMPM = '';

    for( i=minHour; i <= maxHour; i++ )
    {
     h = i>12 ? i-12 : i;
     AMPM = i<12 ? 'AM' : 'PM';

     tbody += '<h3>'+h+':00 '+AMPM+'</h3>';
    }
    tbody += '</th>';

    for( d in oDaySchedule )
    {
     if( !oDaySchedule[d] )
       continue;

     if( d % 2 == 1 )
       tbody += '<td class="gray"><div class="day-container">';
     else
       tbody += '<td><div class="day-container">';

     for( c in oDaySchedule[d] )
     {
       tbody += oDaySchedule[d][c]['html'];
     }
     tbody += '</div></td>';
    }

    tbody += '</tr></tbody>';

    // Finally re-add the new table
    $table.append(tbody);

    // Add Print & Google links
    $('<div id="calendar-footer"><a id="print-schedule" href="" onclick="WAAG.printPreview(); return false;">Print Preview</a><a href<a id="add-to-google" href="http://www.google.com/calendar/render?cid=http%3A%2F%2Fpangolin.sktsoft.com%2Fuiuc%2Fgoogle.cal" target="_blank"><img src="http://www.google.com/calendar/images/ext/gc_button6.gif" border=0></a></div>').insertAfter($table);

   $("#goto_id").datepicker({showAnim:'slideDown'}); // date selector
  };

  WAAG.run();

  WAAG.showDetails = function(course,j)
  {
    var classTimes = '';
    var courseDetails = '';
    for( d in WAAG.courses[course] )
    {
      courseDetails = WAAG.courses[course][d];
      classTimes += courseDetails.time_start+' - '+courseDetails.time_end+' on '+courseDetails.day+'s<br>';
    }

    var detailsHTML = ''
      +'Class Times:<br>'+classTimes
      +'Term: Fall 2010<br>'
      +'<br>'
      +'Instructor: Professor Foobar <img src="http://pangolin.sktsoft.com/uiuc/images/email.png"><br>'
      +'TA: John Doe <img src="http://pangolin.sktsoft.com/uiuc/images/email.png"><br>'
      +'<br>'
      +'Course Website: <a href="https://agora.cs.illinois.edu/display/cs465/Home">https://agora.cs.illinois.edu/display/cs465/Home</a><br>'
      +'Required Textbooks: Human Computer Interaction <img src="http://pangolin.sktsoft.com/uiuc/images/textbook.png"><br>'
      +'<a href="https://ui2web1.apps.uillinois.edu/BANPROD1/bwskfshd.P_CrseSchdDetl?crn='+WAAG.courses[course][j]['CRN']+'">More</a><br>'
      ;

    var dialogOptions = { autoOpen: false
                         ,title:  WAAG.courses[course][j]['course']+' - '+WAAG.courses[course][j]['section']
                         ,width:  700
                         ,height: 450
                         ,show: 'fade'
                         ,modal:  true
                         ,closeText: 'Close'
                        };

    var $dialog = $('<div></div>').html(detailsHTML).dialog(dialogOptions);

    //$('#'course+j).click(function(){ $dialog.dialog('open'); });
    $dialog.dialog('open');
  }

WAAG.printPreview = function()
{
  // Show print css
  var l = document.getElementById('iea-print-preview-css');
  l.media = 'screen';

  var l = document.createElement('link'); l.rel = 'stylesheet'; l.media = 'screen'; l.type='text/css'; l.href='http://pangolin.sktsoft.com/uiuc/iea-print-preview.css'; l.id="iea-css";
  (document.getElementsByTagName('head')[0] || document.body).appendChild(l);

  // Attach nav & print controls
  var back = '<a id="doBack" href="" onclick="WAAG.closePrintPreview(); return false;">&laquo; Back</a>';
  var print = '<a id="doPrint" href="" onclick="window.print(); return false;">Print Calendar</a>';
  $(back).insertBefore('.datadisplaytable');
  $(print).insertAfter('.datadisplaytable');

  WAAG.ieaCSS = $('#iea-css').detach();
}

WAAG.closePrintPreview = function()
{
  // Don't use print css for media=screen anymore
  var l = document.getElementById('iea-print-css');
  l.media = 'print';

  $('#doBack').remove();
  $('#doPrint').remove();

  // Reattach the screen css
  if( WAAG.ieaCSS )
    WAAG.ieaCSS.appendTo('head');
  
}

}; // end init()

})(); // Call anonymous function immediately





