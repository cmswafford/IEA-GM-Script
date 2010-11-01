// ==UserScript==
// @name           CS465 Illinois Improvements
// @namespace      apps.uillinois.edu
// @include        https://ui2web1.apps.uillinois.edu/BANPROD1/bwskfshd.P_CrseSchd
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js
// @require        http://cdn.jquerytools.org/1.2.4/all/jquery.tools.min.js

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
           courses[course][j]['building_short'] = a[x].split(' ')[0];
           courses[course][j]['room'] = a[x].split(' ')[1];
         break;

         default:
           //console.log('Default', x);
       }
     }

     courses[course][j]['html'] = '<div class="class course'+k+'">'+courses[course][j]['course']+'</div>';

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
   });

   $table.html('');
   $table.append('<thead><tr><th></th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th></tr></head>');
   tbody = '<tbody><tr><th><p>'+minTime.split(':')[0]+':00</p></th>';

   for( d in oDaySchedule )
   {
     tbody += '<td>';
     for( c in oDaySchedule[d] )
     {
       tbody += oDaySchedule[d][c]['html'];
     }
     tbody += '</td>';
   }

   tbody += '</tr></tbody>';

   console.log(tbody);

   $table.append(tbody);

}
