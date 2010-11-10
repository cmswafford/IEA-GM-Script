// Add loader and include CSS
(function(){
  var l = document.createElement('link'); l.rel = 'stylesheet'; l.media = 'screen'; l.type='text/css'; l.href=WWW+'/css/iea.css'; l.id="iea-css";
  (document.getElementsByTagName('head')[0] || document.body).appendChild(l);

  l = document.createElement('link'); l.rel = 'stylesheet'; l.media = 'print'; l.type='text/css'; l.href=WWW+'/css/print.css';
  (document.getElementsByTagName('head')[0] || document.body).appendChild(l); l.id="iea-print-css";

  l = document.createElement('link'); l.rel = 'stylesheet'; l.media = 'screen'; l.type='text/css'; l.href=WWW+'/css/jquery-ui-1.8.6.custom.css';
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
  s.setAttribute('src', WWW+'/js/plugins.js?'+ut);
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
       ,MSEB:'Material Sciences Engineering Building'
       ,SIEBL:'Siebel Center'
       ,DCL:'Digital Computing Laboratory'
       ,HAB:'Henry Administration Building'
       ,EH:'Engineering Hall'
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


  WAAG.terms = { 'Jan ':'Spring'
                ,'Feb ':'Spring'
                ,'Mar ':'Spring'
                ,'Apr ':'Spring'
                ,'May ':'Spring'
                ,'June':'Summer'
                ,'July':'Summer'
                ,'Aug ':'Fall'
                ,'Sep ':'Fall'
                ,'Oct ':'Fall'
                ,'Nov ':'Fall'
                ,'Dec ':'Fall'
              };
  WAAG.months = {  'Jan ':'1'
                ,'Feb ':'2'
                ,'Mar ':'3'
                ,'Apr ':'4'
                ,'May ':'5'
                ,'June':'6'
                ,'July':'7'
                ,'Aug ':'8'
                ,'Sep ':'9'
                ,'Oct ':'10'
                ,'Nov ':'11'
                ,'Dec ':'12'
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

    var $iea = $('<div id="iea-schedule"></div>');
    $iea.insertAfter('.infotextdiv');

    // Modify Go To Date box
    var $gotoparent = $('#goto_id').parent();
    $gotoparent.removeClass('rightaligntext').attr('id','goto-date');
    $gotoparent.children('label').html('Date:');
    $gotoparent.children(':submit').val('Go');
    $gotoparent.detach();

    var gotoform = document.createElement('form');
    gotoform.method = 'post';
    gotoform.action = '/BANPROD1/bwskfshd.p_proc_crse_schd';

    $(gotoform).append($gotoparent);
    $iea.append(gotoform);
    $("#goto_id").datepicker({showAnim:'slideDown'}); // Add date selector

    // Change course header
    var $t = $('.fieldlargetext').html();
    $t = $t.replace('Week of ','');
    var mon = $t.substr(0,4);
    WAAG.mm = WAAG.months[mon];
    WAAG.term = WAAG.terms[mon];
    WAAG.year = $t.substr(-4,4);
    WAAG.day = $t.substr(4,2);
	var startDate = new Date(WAAG.mm+'/'+WAAG.day+'/'+WAAG.year); // get date start
	WAAG.StartDate = startDate; // log initial start date
	WAAG.MonDate = (startDate.getMonth()+1)+'/'+ (startDate.getDate()); startDate.setDate(startDate.getDate()+1);
	WAAG.TueDate = (startDate.getMonth()+1)+'/'+ (startDate.getDate()); startDate.setDate(startDate.getDate()+1);
	WAAG.WedDate = (startDate.getMonth()+1)+'/'+ (startDate.getDate()); startDate.setDate(startDate.getDate()+1);
	WAAG.WedDate = (startDate.getMonth()+1)+'/'+ (startDate.getDate()); startDate.setDate(startDate.getDate()+1);
	WAAG.ThuDate = (startDate.getMonth()+1)+'/'+ (startDate.getDate()); startDate.setDate(startDate.getDate()+1);
	WAAG.FriDate = (startDate.getMonth()+1)+'/'+ (startDate.getDate()); 
    var previousLink = $($('.pagebodydiv .plaintable a')[0]).attr('href');
    var nextLink = $($('.pagebodydiv .plaintable a')[1]).attr('href');
    $($('.pagebodydiv .plaintable')[1]).remove();

    $iea.append('<h3 id="iea-schedule-header" class="ui-widget-header ui-corner-top">'+WAAG.term+' '+WAAG.year+'</h3>');

    $iea.append('<p id="schedule-nav"><a style="float:left;" href="'+previousLink+'">&laquo; Previous</a> <a style="float:right;" href="'+nextLink+'">Next &raquo;</a></p>');

    // Add Print & Google links
    $iea.append('<div id="schedule-footer"><a id="print-schedule" href="" title="Print Preview" onclick="WAAG.printPreview(); return false;">Print Preview</a><span class="link-separator"> | </span><a title="View Textbook List" id="list-textbooks">Textbook List</a> <a id="add-to-google" title="Add to Google Calendar" href="http://www.google.com/calendar/render?cid=http%3A%2F%2Fi'+WWW+'%2Fgoogle.cal" target="_blank"><img src="http://www.google.com/calendar/images/ext/gc_button6.gif" border=0></a></div>');

    // Create Textbook List
    var textbooks = ''
    + '<div id="textbooks-page">'
    + '<a href="#" onclick="closeTextbook(); return false;">Textbook</a>'
    + '<ul id="textbook-list">'
    + '<li>CS 411 - Database Systems The Complete Book <a href="http://www.amazon.com/Database-Systems-Complete-Book-GOAL/dp/0130319953"><img src="'+WWW+'/images/amazon-icon.jpg"></a> <a href="http://www.illinibookexchange.com/search.php5?dept=&classnum=&title=&author=&isbn=0130461091&page=0&sort="><img src="'+WWW+'/images/illinois-icon.jpg"></a></li>'
    + '<li>CS 465 - Human-Computer Interaction <a href="http://www.amazon.com/Human-Computer-Interaction-3rd-Alan-Dix/dp/0130461091"><img src="'+WWW+'/images/amazon-icon.jpg"></a> <a href="http://www.amazon.com/Human-Computer-Interaction-3rd-Alan-Dix/dp/0130461091"><img src="'+WWW+'/images/tis-icon.jpg"></a> <a href="http://www.illinibookexchange.com/search.php5?dept=&classnum=&title=&author=&isbn=0130461091&page=0&sort="><img src="'+WWW+'/images/illinois-icon.jpg"></a></li>'
    + '<li>CS 465 - The Design of Everyday Things <a href="http://www.amazon.com/Human-Computer-Interaction-3rd-Alan-Dix/dp/0130461091"><img src="'+WWW+'/images/amazon-icon.jpg"></a> <a href="http://www.amazon.com/Human-Computer-Interaction-3rd-Alan-Dix/dp/0130461091"><img src="'+WWW+'/images/tis-icon.jpg"></a> <a href="http://www.illinibookexchange.com/search.php5?dept=&classnum=&title=&author=&isbn=0130461091&page=0&sort="><img src="'+WWW+'/images/illinois-icon.jpg"></a></li>'
    + '<li>ECE 391 - Advanced UNIX Programming <a href="http://www.amazon.com/Human-Computer-Interaction-3rd-Alan-Dix/dp/0130461091"><img src="'+WWW+'/images/amazon-icon.jpg"></a> <a href="http://www.amazon.com/Human-Computer-Interaction-3rd-Alan-Dix/dp/0130461091"><img src="'+WWW+'/images/tis-icon.jpg"></a> <a href="http://www.illinibookexchange.com/search.php5?dept=&classnum=&title=&author=&isbn=0130461091&page=0&sort="><img src="'+WWW+'/images/illinois-icon.jpg"></a></li>'
    + '<li>ECE 391 - The Linux Kernel<a href="http://www.amazon.com/Human-Computer-Interaction-3rd-Alan-Dix/dp/0130461091"><img src="'+WWW+'/images/amazon-icon.jpg"></a> <a href="http://www.amazon.com/Human-Computer-Interaction-3rd-Alan-Dix/dp/0130461091"><img src="'+WWW+'/images/tis-icon.jpg"></a> <a href="http://www.illinibookexchange.com/search.php5?dept=&classnum=&title=&author=&isbn=0130461091&page=0&sort="><img src="'+WWW+'/images/illinois-icon.jpg"></a></li>'
    + '</ul>'
    + '<a href="#" onclick="window.print(); return false;">Print</a>'
    + '</div>'
    ;
    $iea.append(textbooks);

    // Get all the data
    var $table = WAAG.$('table.datadisplaytable')
    $table.detach().insertBefore('#schedule-footer');
    var dataSpace = $('tr td.ddlabel');
    $table.html('');

    // Loop through each td with a class in it
    dataSpace.each(function(i)
    {
      // Get the class information
      l = $(this).children('a');

      a = (l.html()).split('<br>');
      course = a[0].split('-')[0].replace(' ','');

      // Create the course entry
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
       // Add the specific class to the course
       j = courses[course].push({});
       j -= 1;

       for( x in courseIndices )
       {
         if( courseIndices[x] == course )
         {
           // Mark this class in the courses array
           k = x;
           break;
         }
       }
     } 

     // Get all the class information
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

     // Create the HTML to insert for this class
     courses[course][j]['html'] = ''
     +'<div id="'+course+j+'" onclick="WAAG.showDetails(\''+course+'\','+j+');" style="height:'+courses[course][j]['duration']+';top: '+parseInt((curHour-minHour)*60+parseInt(minOffset))+'px" class="class ui-corner-all course'+k+'">'+courses[course][j]['course']
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

    // Make new HTML header
    $table.append('<thead><tr><th></th><th>Monday <span id="start-date">'+WAAG.MonDate+'</span></th><th class="gray">Tuesday '+WAAG.TueDate+'</th><th>Wednesday '+WAAG.WedDate+'</th><th class="gray">Thursday '+WAAG.ThuDate+'</th><th>Friday '+WAAG.FriDate+'</th></tr></head>');

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
	
	// Final Processing //
	$("#schedule-nav a, #goto-date input:eq(2), .headerlinksdiv2 input:eq(1)").button(); // next/prev/go buttons
	$table.addClass("ui-corner-all");
	$("#goto_id, #keyword_in_id").addClass("ui-corner-all");
	$("#iea-schedule form:eq(0)").wrap("<div id='dateSearch' class='ui-corner-all'></div>");
    $("#dateSearch").detach().prependTo(".pagebodydiv");
    $("#dateSearch").prepend("<h5 class='ui-widget-header ui-corner-all'>Search Schedule by Date</h5>");
    $("label[for=goto_id]").hide();
	
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
      +'<div class="class-left"><span class="classHeading">Class Times - '+ WAAG.term + ' ' + WAAG.year + '</span><br>'+classTimes      
      +'<br/></div><div class="class-right"><span class="classHeading">Faculty</span><br/>'
      +'Instructor: Professor Foobar <img src="'+WWW+'/images/email.png"><br>'
      +'TA: John Doe <img src="'+WWW+'/images/email.png"><br>'
	  +'<div class="class-map-container ui-corner-all" id="map-container"><div class="class-map-tabs" id="map-tabs">'
	  +'  <ul><li><a href="#tabs-1">Aerial Map</a></li><li><a href="#tabs-2">Building</a></li><li><a href="#tabs-3">Classroom</a></li></ul>'
	  +'  <div id="tabs-1"><div class="class-map ui-corner-all"><img src="'+WWW+'/images/bing.map.png"></div>	</div>'
	  +'  <div id="tabs-2"><div class="class-map ui-corner-all"><img src="'+WWW+'/images/bing.map3.png"></div>	</div>'  
	  +'  <div id="tabs-3"><div class="class-map ui-corner-all"><img src="'+WWW+'/images/bing.map2.png"></div>	</div>'  
	  +'</div></div>'	  
	  +'</div>'
      +'<div class="class-reg"><span class="classHeading">Course Resources</span><br/>'
      +'<a class="courseWebsite" target="_blank" href="https://agora.cs.illinois.edu/display/cs465/Home">Course Website</a><br>'
      +'Required Textbooks: <ul><li>Human Computer Interaction <img src="'+WWW+'/images/textbook.png"></li></ul><br>'
      +'<a href="https://ui2web1.apps.uillinois.edu/BANPROD1/bwskfshd.P_CrseSchdDetl?crn='+WAAG.courses[course][j]['CRN']+'">More</a><br></div>';

    var dialogOptions = { autoOpen: false
                         ,title:  WAAG.courses[course][j]['course']+' - '+WAAG.courses[course][j]['section']
                         ,width:  720
                         ,height: 450
                         ,show: 'fade'
                         ,modal:  true
                         ,closeText: 'Close'
						 ,open : function() { $tabs = $("#map-tabs").tabs(); $tabs.tabs("select", 0);}
						 ,close : function() { $(".detailsWrapper").remove();}
                        };

    var $dialog = $('<div class="detailsWrapper"></div>').html(detailsHTML).dialog(dialogOptions);

    //$('#'course+j).click(function(){ $dialog.dialog('open'); });
    $dialog.dialog('open');
  }

WAAG.printPreview = function()
{
  // Show print-preview print
  l = document.createElement('link'); l.rel = 'stylesheet'; l.media = 'screen'; l.type='text/css'; l.href=WWW+'/css/print-preview.css'; l.id="print-preview-css";
  (document.getElementsByTagName('head')[0] || document.body).appendChild(l);

  // Attach nav & print controls
  var back = '<a id="doBack" href="" onclick="WAAG.closePrintPreview(); return false;">&laquo; Back</a>';
  var print = '<a id="doPrint" href="" onclick="window.print(); return false;">Print Calendar</a>';
  $(back).insertBefore('#iea-schedule-header');
  $(print).insertAfter('.datadisplaytable');
  $('#start-date').hide();
 }

WAAG.closePrintPreview = function()
{
  // Don't use print-preview css for media=screen anymore
  $('#print-preview-css').remove();

  $('#doBack').remove();
  $('#doPrint').remove();
  $('#start-date').show();
  
}

WAAG.Textbooks = function()
{
}

WAAG.closeTextbooksList = function()
{
}

}; // end init()

})(); // Call anonymous function immediately





