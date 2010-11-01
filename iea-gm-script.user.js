// ==UserScript==
// @name           Registration
// @description    Custom interaction/styles for UIUC IEA.
// @namespace      apps.uillinois.edu
// @include        https://ui2web1.apps.uillinois.edu/*
// @include        http://eai.localhost/*
// @resource       jQuery               http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @resource       jQueryUI             http://strd6.com/stuff/jqui/jquery-ui-personalized-1.6rc6.min.js
// @resource       jQueryUICSS          http://strd6.com/stuff/jqui/theme/ui.all.css
// @resource    ui-bg_diagonals-thick_18_b81900_40x40.png       http://strd6.com/stuff/jqui/theme/images/ui-bg_diagonals-thick_18_b81900_40x40.png
// @resource    ui-bg_glass_100_f6f6f6_1x400.png                http://strd6.com/stuff/jqui/theme/images/ui-bg_glass_100_f6f6f6_1x400.png
// @resource    ui-bg_diagonals-thick_20_666666_40x40.png       http://strd6.com/stuff/jqui/theme/images/ui-bg_diagonals-thick_20_666666_40x40.png
// @resource    ui-bg_glass_65_ffffff_1x400.png                 http://strd6.com/stuff/jqui/theme/images/ui-bg_glass_65_ffffff_1x400.png
// @resource    ui-bg_gloss-wave_35_f6a828_500x100.png          http://strd6.com/stuff/jqui/theme/images/ui-bg_gloss-wave_35_f6a828_500x100.png
// @resource    ui-icons_222222_256x240.png                     http://strd6.com/stuff/jqui/theme/images/ui-icons_222222_256x240.png
// @resource    ui-bg_flat_10_000000_40x100.png                 http://strd6.com/stuff/jqui/theme/images/ui-bg_flat_10_000000_40x100.png
// @resource    ui-icons_ef8c08_256x240.png                     http://strd6.com/stuff/jqui/theme/images/ui-icons_ef8c08_256x240.png
// @resource    ui-icons_ffd27a_256x240.png                     http://strd6.com/stuff/jqui/theme/images/ui-icons_ffd27a_256x240.png
// @resource    ui-bg_glass_100_fdf5ce_1x400.png                http://strd6.com/stuff/jqui/theme/images/ui-bg_glass_100_fdf5ce_1x400.png
// @resource    ui-icons_228ef1_256x240.png                     http://strd6.com/stuff/jqui/theme/images/ui-icons_228ef1_256x240.png
// @resource    ui-icons_ffffff_256x240.png                     http://strd6.com/stuff/jqui/theme/images/ui-icons_ffffff_256x240.png
// @resource    ui-bg_highlight-soft_75_ffe45c_1x100.png        http://strd6.com/stuff/jqui/theme/images/ui-bg_highlight-soft_75_ffe45c_1x100.png
// @resource    ui-bg_highlight-soft_100_eeeeee_1x100.png       http://strd6.com/stuff/jqui/theme/images/ui-bg_highlight-soft_100_eeeeee_1x100.png
// @version         1.0.00
// @contributor     Aaron Hogue, Mark Swafford
// ==/UserScript==

(function() {
  var head = document.getElementsByTagName('head')[0];

  var script = document.createElement('script');
  script.type = 'text/javascript';

  var jQuery = GM_getResourceText('jQuery');
  var jQueryUI = GM_getResourceText('jQueryUI');

  script.innerHTML = jQuery + jQueryUI;
  head.appendChild(script);

  $ = unsafeWindow.$;
})();

// Load UI Styles
(function() {
    var resources = {
      'ui-bg_diagonals-thick_18_b81900_40x40.png': GM_getResourceURL('ui-bg_diagonals-thick_18_b81900_40x40.png'), 
      'ui-bg_glass_100_f6f6f6_1x400.png': GM_getResourceURL('ui-bg_glass_100_f6f6f6_1x400.png'),
      'ui-bg_diagonals-thick_20_666666_40x40.png': GM_getResourceURL('ui-bg_diagonals-thick_20_666666_40x40.png'),
      'ui-bg_glass_65_ffffff_1x400.png': GM_getResourceURL('ui-bg_glass_65_ffffff_1x400.png'),
      'ui-bg_gloss-wave_35_f6a828_500x100.png': GM_getResourceURL('ui-bg_gloss-wave_35_f6a828_500x100.png'),
      'ui-icons_222222_256x240.png': GM_getResourceURL('ui-icons_222222_256x240.png'),
      'ui-bg_flat_10_000000_40x100.png': GM_getResourceURL('ui-bg_flat_10_000000_40x100.png'),
      'ui-icons_ef8c08_256x240.png': GM_getResourceURL('ui-icons_ef8c08_256x240.png'),
      'ui-icons_ffd27a_256x240.png': GM_getResourceURL('ui-icons_ffd27a_256x240.png'),
      'ui-bg_glass_100_fdf5ce_1x400.png': GM_getResourceURL('ui-bg_glass_100_fdf5ce_1x400.png'),
      'ui-icons_228ef1_256x240.png': GM_getResourceURL('ui-icons_228ef1_256x240.png'),
      'ui-icons_ffffff_256x240.png': GM_getResourceURL('ui-icons_ffffff_256x240.png'),
      'ui-bg_highlight-soft_75_ffe45c_1x100.png': GM_getResourceURL('ui-bg_highlight-soft_75_ffe45c_1x100.png'),
      'ui-bg_highlight-soft_100_eeeeee_1x100.png': GM_getResourceURL('ui-bg_highlight-soft_100_eeeeee_1x100.png')
    };
 
    var head = document.getElementsByTagName('head')[0];
 
    var style = document.createElement('style');
    style.type = 'text/css';
 
    var css = GM_getResourceText ('jQueryUICSS');
    $.each(resources, function(resourceName, resourceUrl) {
      console.log(resourceName + ': ' + resourceUrl);
      css = css.replace( 'images/' + resourceName, resourceUrl);
    });
 
    style.innerHTML = css;
    head.appendChild(style);
})();


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
			 
			 +'.ui-widget { font-size:0.8em !important;}'

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
  
  // jquery ui css
  // var tag = document.createElement('link');
			// tag.href = "http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.3/themes/base/jquery-ui.css";
			// tag.type = 'text/css';
			// tag.rel = 'stylesheet';
			
	// document.body.appendChild(tag);

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
  else if( /bwskfshd.P_CrseSchd*|bwskfshd.p_proc_crse_schd/.test(document.location) )
  {
	GM_log('running course week at a glance');
	
	$("#goto_id").datepicker(); // date selector
    $(".infotextdiv").hide(); // hides info text (minimal)
  }
}


