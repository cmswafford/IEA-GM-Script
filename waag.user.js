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
   var $origTable = $('table.datadisplaytable');
   var $copyTable = $origTable;
   var tbody = document.createElement('tbody');

   var courses = {};
   var course = '';
   var i = 0;
   var j = 0;
   var a = [];
   var parts = [];

   //console.log($('table.datadisplaytable a'));
   $('table.datadisplaytable a').each(function(i){
     a = ($(this).html()).split('<br>');
     course = a[0].split('-')[0].replace(' ','');
     console.log(course);

     if( courses[course] === undefined )
     {
       j = 0;
       courses[course] = [];
       courses[course][j] = {};
     }
     else
     {
       console.log(courses[course]);
       j = courses[course].push({});
     } 

     for( x in a )
     {
       //console.log(x, a[x]);
       console.log(course);
       switch(x)
       {
         case '0':
           parts = a[x].split('-');
           course = parts[0].replace(' ','');
           courses[course][j]['course'] = parts[0];
           courses[course][j]['section'] = parts[1];
         break;

         case '1':
           courses[course][j]['CRN'] = a[x].split(' ')[0];
         break;

         default:
           //console.log('Default', x);
         //tbody.appendChild(a[x]);
       }
     }
   } );

   console.log(courses);

   //$origTable.html('');
   //$origTable.append(tbody);



}
