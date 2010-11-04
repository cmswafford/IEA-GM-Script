// ==UserScript==
// @name           CS465 Illinois Improvements
// @namespace      apps.uillinois.edu
// @include        https://ui2web1.apps.uillinois.edu/BANPROD1/bwskfshd.P_CrseSchd
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js
// @require        http://cdn.jquerytools.org/1.2.4/all/jquery.tools.min.js

GM_addStyle('table.datadisplaytable { position: relative; font-size: 11px; }');
GM_addStyle('table.datadisplaytable tr { position: relative; }' );
GM_addStyle('table.datadisplaytable td { position: relative; width: 130px; }');
GM_addStyle('table.datadisplaytable td div.day-container{ position: relative; margin:0; padding: 0; height:100%; }') 
GM_addStyle('table.datadisplaytable td div.class { position: absolute; margin:0; padding: 0; border: 1px solid #000; text-align: center; width: 100%; }');
GM_addStyle('h3 { margin:0; padding:0; height: 60px; vertical-align: top; }');

// Call main()
(function(){ main(); } )();

// All your GM code must be inside this function
function main()
{
   var $table = $('table.datadisplaytable');
   var $copyTable = $table;
   var tbody = null;

   var courses = {};
   var course = '';
   var i,j,k,x = 0;
   var a = [];
   var b = '';
   var parts = [];
   var startAMPM, endAMPM, startHour, endHour, startMinute, endMinute = '';
   var totalMinutes = 0;
   var iDay = 0; // 0 = Monday, 1 = Tuesday ... 6 = Sunday
   var p = null;
   var oDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
   var oDaySchedule = [ [], [], [], [], [], [], [] ];
   var courseIndices = [];

   var tds = null;
   var minTime, maxTime = '';
   var minHour = 0;
   var maxHour = 0;
   var h = 0;
   var AMPM = '';


   // Get all the data
   var dataSpace = $('tr td.ddlabel');
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

           courses[course][j]['building_long'] = building_to_long(shortB);
           courses[course][j]['building_short'] = shortB;

           courses[course][j]['room'] = a[x].split(' ')[1];
         break;

         default:
           //console.log('Default', x);
       }
     }

     minHour = minTime.split(':')[0];
     maxHour = maxTime.split(':')[0];

     curHour = courses[course][j]['time_24_start'].split(':')[0];
     minOffset = courses[course][j]['time_24_start'].split(':')[1];

     courses[course][j]['html'] = ''
     +'<div style="height:'+courses[course][j]['duration']+';top: '+parseInt((curHour-minHour)*60+parseInt(minOffset))+'px" class="class course'+k+'">'+courses[course][j]['course']
       +'<br><span title="'+courses[course][j]['building_long']+'">'+courses[course][j]['building_short']+' '+courses[course][j]['room']+'</span>'
       +'<br>'+courses[course][j]['time_start']+' - '+courses[course][j]['time_end']
     +'</div>';

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


     console.log(courses[course]);
   });

   $table.html('');
   $table.append('<thead><tr><th></th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th></tr></head>');

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
     tbody += '<td><div class="day-container">';
     for( c in oDaySchedule[d] )
     {
       tbody += oDaySchedule[d][c]['html'];
     }
     tbody += '</div></td>';
   }

   tbody += '</tr></tbody>';

   $table.append(tbody);
}

function building_to_long( building_short )
{
  var buildings = { EVRT:'Everitt Laboratory', MSEB:'Material Sciences Engineering Building', SIEBL:'Siebel Center', DCL:'Digital Computing Laboratory', HAB:'Henry Administration Building' };

  return buildings[building_short];
}
