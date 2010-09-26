// ==UserScript==
// @name           Registration
// @namespace      apps.uillinois.edu
// @include        https://ui2web1.apps.uillinois.edu/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js
// @require        http://cdn.jquerytools.org/1.2.4/all/jquery.tools.min.js
// ==/UserScript==

GM_registerMenuCommand('Setup preferences', setup);
GM_registerMenuCommand('Delete preferences', reset);

GM_addStyle( 
             'table.datadisplaytable { border-collapse: collapse; 1px solid #ccc; border-top: 1px solid #ccc; border-left: 1px solid #ccc; }'
             +'table.datadisplaytable th.ddtitle, table.datadisplaytable th.ddheader { background-color: #003366; color: #fff; }'
             +'table.datadisplaytable th.ddtitle { height: 30px; padding: 0 !important;  }'
             +'table.datadisplaytable th{ vertical-align: middle; text-align: center !important; border-right: 1px solid #ccc !important; border-bottom: 1px solid #ccc !important; padding: 3px !important; }'
             +'table.datadisplaytable td { vertical-align: middle !important; text-align: center !important; border-right: 1px solid #ccc !important; }'

             +'table.datadisplaytable tbody tr:hover td { background-color: #ffcc66 !important; border: 1px solid #000 !important; }'
             +'.hoverBorder { border-bottom: 1px solid #000 !important; border-right: 1px solid #000 !important; }'
             +'.normalBorder { border-bottom: 1px solid #ccc !important; }'

           );

function reset()
{
  GM_deleteValue('defaultDept');
  GM_deleteValue('alwaysAgree');
}

function setup()
{
  var alwaysAgree = confirm('Always agree to Registration Agreement?');
  GM_setValue('alwaysAgree',alwaysAgree);

  var defaultDept = prompt('What department would you like selected by default when searching for classes? e.g. ECE, CS, ARCH, etc.');
  GM_setValue('defaultDept',defaultDept);
}

(function(){ main(); } )();

// All your GM code must be inside this function
function main()
{
  // If the user hasn't yet set their preferences, run the setup() function
  if( GM_getValue('alwaysAgree') === undefined )
  {
    setup();
  }


  // Look-up Classes registration agreement page
  if( /name=bmenu.P_RegAgreementLook/.test(document.location) )
  {
    if( GM_getValue('alwaysAgree') === true )
    {
      var next = window.location.protocol+'//'+window.location.host+'/BANPROD1/bwskfcls.p_sel_crse_search';
      window.location = next;
    }
  }

  // Add / Remove Classes */
  else if( /name=bmenu.P_RegAgreementAdd/.test(document.location) )
  {
    //var next = window.location.protocol+'//'+window.location.host+'/BANPROD1/bwskfreg.P_AltPin';
    //window.location = next;
  }

  // Look-up Classes term select page
  else if( /bwskfcls.p_sel_crse_search/.test(document.location) )
  {
    var select = document.getElementById('term_input_id');
    var options = select.getElementsByTagName('option');
    options[1].selected = true;

    document.getElementsByTagName('form')[1].submit();
  }

  // Look-up classes form page
  else if( /bwckgens.p_proc_term_date/.test(document.location) )
  {
    var select = document.getElementById('subj_id');
    var options = select.getElementsByTagName('option');
    for( i in options )
    {
      if( options[i].value == GM_getValue('defaultDept') )
      {
        options[i].selected = true;
        break;
      }
    }
  }

  // Look-up or select courses results page
  else if( /bwskfcls.P_GetCrse/.test(document.location) )
  {
    $('table.datadisplaytable tbody tr td').addClass('normalBorder');
    $('table.datadisplaytable tbody tr:odd').css('background-color', '#f7f7f7');
    $('table.datadisplaytable tbody tr:odd').css('background-color', '#f7f7f7');
    $('table.datadisplaytable tbody tr').hover( function(){ $(this).prev().children().removeClass('normalBorder').addClass('hoverBorder'); }, function(){ $(this).prev().children().removeClass('hoverBorder').addClass('normalBorder'); } );
  }

  // Course page
  /*else if( /bwskfshd.P_CrseSchd/.test(document.location) )
  {
    
  }*/ 
}


