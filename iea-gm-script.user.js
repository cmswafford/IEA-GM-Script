// ==UserScript==
// @name           Registration
// @namespace      apps.uillinois.edu
// @include        https://ui2web1.apps.uillinois.edu/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js
// @require        http://cdn.jquerytools.org/1.2.4/all/jquery.tools.min.js
// ==/UserScript==

GM_registerMenuCommand('Setup', setup());

function setup()
{
  GM_setValue('UIUC_Agreement','true');
}

(function(){ page_state_machine(); } )();

// All your GM code must be inside this function
function page_state_machine()
{
  if( GM_getValue('UIUC_Agreement') === undefined )
    setup();

  //alert($); // check if the dollar (jquery) function works
  //alert($().jquery); // check jQuery version
  if( /name=bmenu.P_RegAgreementLook/.test(document.location) )
  {
    var next = window.location.protocol+'//'+window.location.host+'/BANPROD1/bwskfcls.p_sel_crse_search';
    window.location = next;
  }
  else if( /bwskfcls.p_sel_crse_search/.test(document.location) )
  {
    var select = document.getElementById('term_input_id');
    var options = select.getElementsByTagName('option');
    options[1].selected = true;

    document.getElementsByTagName('form')[1].submit();
  }
  else if( /bwckgens.p_proc_term_date/.test(document.location) )
  {
    var select = document.getElementById('subj_id');
    var options = select.getElementsByTagName('option');
    for( i in options )
    {
      if( options[i].value == 'ECE' )
      {
        options[i].selected = true;
        break;
      }
    }
  }
  /*else if( /bwskfshd.P_CrseSchd/.test(document.location) )
  {
    
  }*/ 
}


