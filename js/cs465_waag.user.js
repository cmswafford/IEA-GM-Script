// ==UserScript==
// @name           CS465 WAAG
// @description    Custom interaction/styles for UIUC IEA.
// @namespace      apps.uillinois.edu
// @include        https://*apps.uillinois.edu/BANPROD1/bwskfshd.P_CrseSchd*
// @include        https://*apps.uillinois.edu/BANPROD1/bwskfshd.p_proc_crse_schd*
// @version         1.0.00
// @contributor     Mark Swafford, Aaron Hogue
// ==/UserScript==

window.WWW = 'http://pangolin.sktsoft.com/uiuc'; // sandboxed URI
// window.WWW = 'http://eai.localhost/uiuc'; // sandboxed URI [I2CS]
var isI2CS = false; // initializer;

InitVars(); // allow waag.js to see WWW
  
// Call main()
(function(){ main(); } )();

// On DOM Ready
function main()
{
  // setup waag core
  var s = document.createElement('script');
  s.type = 'text/javascript';
  //s.src = 'http://dl.dropbox.com/u/124437/waag.js?time='+uts();
  var time = Math.round(new Date().getTime() / 1000);
  s.src = WWW+'/js/waag.js?time='+time;
  (document.getElementsByTagName('head')[0] || document.body).appendChild(s);
  
  GM_registerMenuCommand( 'Add Test Data', createCalendar, 'm', 'control alt' );
  
  // I2CS use local test data
  if (isI2CS) {
	createCalendar();
  }
}

// Creates Custom Command
function createCalendar()
{
  // Add the old HTML first
  document.getElementsByTagName('body')[0].innerHTML = '<div class="headerwrapperdiv"> <div class="pageheaderdiv1"> <a class="skiplinks" onblur="window.status=\'\'; return true" onfocus="window.status=\'Go to Main Content\'; return true" onmouseout="window.status=\'\'; return true" onmouseover="window.status=\'Go to Main Content\'; return true" href="#main_content">Go to Main Content</a> <h1>University of Illinois</h1></div><div class="headerlinksdiv"> <span class="pageheaderlinks2"> <map title="Module Navigation Links" name="Module_Navigation_Links_H"> <p> <a class="skiplinks" onblur="window.status=\'\'; return true" onfocus="window.status=\'Skip Module Navigation Links\'; return true" onmouseout="window.status=\'\'; return true" onmouseover="window.status=\'Skip Module Navigation Links\'; return true" href="#skip_Module_Navigation_Links_H">Skip Module Navigation Links</a> <table width="100%" cellspacing="0" cellpadding="0" border="0" summary="This is main table for displaying Tab Items." class="plaintable"> <tbody><tr> <td class="pldefault"> <table cellspacing="0" cellpadding="0" border="0" summary="This table displays Tab Items." class="plaintable"> <tbody><tr> <td height="22" class="taboff"> <a onblur="window.status=\'\'; return true" onfocus="window.status=\'New Personal Information\'; return true" onmouseout="window.status=\'\'; return true" onmouseover="window.status=\'New Personal Information\'; return true" href="/BANPROD1/twbkwbis.P_GenMenu?name=bmenu.P_GenMnu">Personal Information</a> </td> <td valign="top" height="22" align="right" class="bgtaboff"> <img width="8" vspace="0" hspace="0" height="20" border="0" name="web_tab_corner_right" title="" class="headerImg" src="/wtlgifs/web_tab_corner_right.gif"> </td> <td height="22" class="taboff"> <a onblur="window.status=\'\'; return true" onfocus="window.status=\'Financial Aid \'; return true" onmouseout="window.status=\'\'; return true" onmouseover="window.status=\'Financial Aid \'; return true" href="/BANPROD1/twbkwbis.P_GenMenu?name=bmenu.P_FinAidMainMnu">Financial Aid </a> </td> <td valign="top" height="22" align="right" class="bgtaboff"> <img width="8" vspace="0" hspace="0" height="20" border="0" name="web_tab_corner_right" title="" class="headerImg" src="/wtlgifs/web_tab_corner_right.gif"> </td> <td height="22" class="tabon"> <a onblur="window.status=\'\'; return true" onfocus="window.status=\'Registration &amp; Records\'; return true" onmouseout="window.status=\'\'; return true" onmouseover="window.status=\'Registration &amp; Records\'; return true" href="/BANPROD1/twbkwbis.P_GenMenu?name=bmenu.P_StuMainMnu">Registration &amp; Records</a> </td> <td valign="top" height="22" align="right" class="bgtabon"> <img width="8" vspace="0" hspace="0" height="20" border="0" name="web_tab_corner_right" title="" class="headerImg" src="/wtlgifs/web_tab_corner_right.gif"> </td> <td height="22" class="taboff"> <a onblur="window.status=\'\'; return true" onfocus="window.status=\'Account Billing Information\'; return true" onmouseout="window.status=\'\'; return true" onmouseover="window.status=\'Account Billing Information\'; return true" href="/BANPROD1/twbkwbis.P_GenMenu?name=bmenu.P_StuAcct_BillInfo">Account Billing Information</a> </td> <td valign="top" height="22" align="right" class="bgtaboff"> <img width="8" vspace="0" hspace="0" height="20" border="0" name="web_tab_corner_right" title="" class="headerImg" src="/wtlgifs/web_tab_corner_right.gif"> </td> <td height="22" class="taboff"> <a onblur="window.status=\'\'; return true" onfocus="window.status=\'Graduation\'; return true" onmouseout="window.status=\'\'; return true" onmouseover="window.status=\'Graduation\'; return true" href="/BANPROD1/twbkwbis.P_GenMenu?name=bmenu.P_GradMainMnu">Graduation</a> </td> <td valign="top" height="22" align="right" class="bgtaboff"> <img width="8" vspace="0" hspace="0" height="20" border="0" name="web_tab_corner_right" title="" class="headerImg" src="/wtlgifs/web_tab_corner_right.gif"> </td> </tr> </tbody></table> </td> </tr> <tr> <td width="100%" colspan="2" class="bgtabon"><img width="10" vspace="0" hspace="0" height="3" border="0" name="web_transparent" title="" class="headerImg" src="/wtlgifs/web_transparent.gif"></td></tr></tbody></table> </p></map> </span> <a name="skip_Module_Navigation_Links_H"></a> </div> <table width="100%" summary="This table displays Menu Items and Banner Search textbox." class="plaintable"> <tbody><tr> <td class="pldefault"> <div class="headerlinksdiv2"> <form method="POST" action="/BANPROD1/twbksrch.P_ShowResults"> Search <span class="fieldlabeltextinvisible"><label for="keyword_in_id"><span class="fieldlabeltext">Search</span></label></span> <input type="text" id="keyword_in_id" maxlength="65" size="20" name="KEYWRD_IN"> <input type="submit" value="Go"> </form> </div> </td> <td class="pldefault"><p class="rightaligntext"> <span class="pageheaderlinks"> <a id="ssbbackurl" class="submenulinktext2" href="/BANPROD1/twbkwbis.P_GenMenu?name=bmenu.P_RegMnu">RETURN TO MENU</a> | <a class="submenulinktext2" accesskey="2" href="/BANPROD1/twbksite.P_DispSiteMap?menu_name_in=bmenu.P_MainMnu&amp;depth_in=2&amp;columns_in=3">SITE MAP</a> | <a class="submenulinktext2" onblur="window.status=\'\'; return true" onfocus="window.status=\'\';  return true" onmouseout="window.status=\'\'; return true" onmouseover="window.status=\'\';  return true" target="_blank" onclick="popup = window.open(\'/UI_help/P_CrseSchd.html\', \'PopupPage\',\'height=450,width=500,scrollbars=yes,resizable=yes\'); return false" accesskey="H" href="/UI_help/P_CrseSchd.html">HELP</a> | <a class="submenulinktext2" accesskey="3" href="twbkwbis.P_Logout">EXIT</a> </span> </p></td> </tr> </tbody></table> </div> <div class="pagetitlediv"> <table width="100%" summary="This table displays title and static header displays." class="plaintable"> <tbody><tr> <td class="pldefault"> <h2>Student Schedule - Week at a Glance</h2> </td> <td class="pldefault"> &nbsp; </td> <td class="pldefault"><p class="rightaligntext"> </p><div class="staticheaders">Student<br> Nov 09, 2010 01:25 am<br> </div> </td> </tr> <tr> <td width="100%" colspan="3" class="bg3"><img width="10" vspace="0" hspace="0" height="3" border="0" name="web_transparent" title="" class="headerImg" src="/wtlgifs/web_transparent.gif"></td> </tr> </tbody></table> <a name="main_content"></a> </div> <div class="pagebodydiv"> <!--  ** END OF twbkwbis.P_OpenDoc **  --> <div class="infotextdiv"><table summary="This layout table contains information that may be helpful in understanding the content and functionality of this page.  It could be a brief set of instructions, a description of error messages, or other special information." class="infotexttable"><tbody><tr><td class="indefault"><img width="14" vspace="0" hspace="0" height="12" border="0" name="web_info" title="" class="headerImg" src="/wtlgifs/web_info_cascade.png"></td><td class="indefault"><span class="infotext"> To <b>print your University of Illinois schedule</b>, follow the print instructions for your web browser as you would to print any web page. For example, with Internet Explorer, select the Print option from the File menu.<p> The following is your student schedule by day and time. Classes that do not have scheduled meeting times are listed at the bottom of the page. Click on hyperlinked courses for more detail.</p></span></td></tr></tbody></table><p></p></div> <form method="post" action="/BANPROD1/bwskfshd.p_proc_crse_schd"> <table width="100%" summary="This layout table is used to present the goto date input field and submit button." class="plaintable"> <tbody><tr> <td class="pldefault"><p class="rightaligntext"> <label for="goto_id"><span class="fieldlabeltext">Go to (MM/DD/YYYY):</span></label> <input type="text" id="goto_id" maxlength="10" size="11" name="goto_date_in"> <input type="hidden" value="11/09/2010" name="start_date_in"> <input type="submit" value="Submit"> </p></td> </tr> </tbody></table> </form> <table width="80%" summary="This layout table is used to present the goto previous and next week anchors along with the current week information." class="plaintable"> <tbody><tr> <td class="pldefault" colspan="1"><a onblur="window.status=\'\';  return true" onmouseout="window.status=\'\';  return true" onfocus="window.status=\'Previous Week\';  return true" onmouseover="window.status=\'Previous Week\';  return true" href="/BANPROD1/bwskfshd.P_CrseSchd?start_date_in=11/01/2010">Previous Week</a></td> <td class="pldead" colspan="4">&nbsp;</td> <td class="pldefault" colspan="3"><span class="fieldlargetext">Week of Nov 08, 2010</span><span class="fieldmediumtext"> (116 of 141)</span></td> <td class="pldead" colspan="1">&nbsp;</td> <td class="pldefault" colspan="1"><p class="rightaligntext"><a onblur="window.status=\'\';  return true" onmouseout="window.status=\'\';  return true" onfocus="window.status=\'Next Week\';  return true" onmouseover="window.status=\'Next Week\';  return true" href="/BANPROD1/bwskfshd.P_CrseSchd?start_date_in=11/15/2010">Next Week</a></p></td> </tr> </tbody></table> <table width="80%" summary="This layout table is used to present the weekly course schedule." class="datadisplaytable"> <tbody><tr> <th scope="col" class="ddheader">&nbsp;</th> <th scope="col" class="ddheader">&nbsp;&nbsp;&nbsp;Monday&nbsp;&nbsp;&nbsp;</th> <th scope="col" class="ddheader">&nbsp;&nbsp;&nbsp;Tuesday&nbsp;&nbsp;&nbsp;</th> <th scope="col" class="ddheader">&nbsp;&nbsp;&nbsp;Wednesday&nbsp;&nbsp;&nbsp;</th> <th scope="col" class="ddheader">&nbsp;&nbsp;&nbsp;Thursday&nbsp;&nbsp;&nbsp;</th> <th scope="col" class="ddheader">&nbsp;&nbsp;&nbsp;Friday&nbsp;&nbsp;&nbsp;</th> <th scope="col" class="ddheader">&nbsp;&nbsp;&nbsp;Saturday&nbsp;&nbsp;&nbsp;</th> <th scope="col" class="ddheader">&nbsp;&nbsp;&nbsp;Sunday&nbsp;&nbsp;&nbsp;</th> </tr> <tr> <th scope="row" class="ddlabel" rowspan="4">11am</th> <td class="ddlabel" rowspan="3"><a href="/BANPROD1/bwskfshd.P_CrseSchdDetl?term_in=120108&amp;crn=49976">ECE 313-D<br>49976 Class<br>11:00 am-11:50 am<br>1EVRT 163</a></td> <td class="ddlabel" rowspan="5"><a href="/BANPROD1/bwskfshd.P_CrseSchdDetl?term_in=120108&amp;crn=47765">ECE 391-AL<br>47765 Class<br>11:00 am-12:20 pm<br>1MSEB 119</a></td> <td class="ddlabel" rowspan="3"><a href="/BANPROD1/bwskfshd.P_CrseSchdDetl?term_in=120108&amp;crn=49976">ECE 313-D<br>49976 Class<br>11:00 am-11:50 am<br>1EVRT 163</a></td> <td class="ddlabel" rowspan="5"><a href="/BANPROD1/bwskfshd.P_CrseSchdDetl?term_in=120108&amp;crn=47765">ECE 391-AL<br>47765 Class<br>11:00 am-12:20 pm<br>1MSEB 119</a></td> <td class="ddlabel" rowspan="3"><a href="/BANPROD1/bwskfshd.P_CrseSchdDetl?term_in=120108&amp;crn=49976">ECE 313-D<br>49976 Class<br>11:00 am-11:50 am<br>1EVRT 163</a></td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> <tr> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> <tr> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> <tr> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> <tr> <th scope="row" class="ddlabel" rowspan="4">12pm</th> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> <tr> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> <tr> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="ddlabel" rowspan="5"><a href="/BANPROD1/bwskfshd.P_CrseSchdDetl?term_in=120108&amp;crn=43388">CS 465-M3<br>43388 Class<br>12:30 pm-1:45 pm<br>1SIEBL 1109</a></td> <td class="dddefault">&nbsp;</td> <td class="ddlabel" rowspan="5"><a href="/BANPROD1/bwskfshd.P_CrseSchdDetl?term_in=120108&amp;crn=43388">CS 465-M3<br>43388 Class<br>12:30 pm-1:45 pm<br>1SIEBL 1109</a></td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> <tr> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> <tr> <th scope="row" class="ddlabel" rowspan="4">1pm</th> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> <tr> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> <tr> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> <tr> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> <tr> <th scope="row" class="ddlabel" rowspan="4">2pm</th> <td class="dddefault">&nbsp;</td> <td class="ddlabel" rowspan="3"><a href="/BANPROD1/bwskfshd.P_CrseSchdDetl?term_in=120108&amp;crn=50239">ECE 391-AD1<br>50239 Class<br>2:00 pm-2:50 pm<br>1EVRT 168</a></td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> <tr> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> <tr> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> <tr> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> <tr> <th scope="row" class="ddlabel" rowspan="4">3pm</th> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> <tr> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> <tr> <td class="dddefault">&nbsp;</td> <td class="ddlabel" rowspan="5"><a href="/BANPROD1/bwskfshd.P_CrseSchdDetl?term_in=120108&amp;crn=30109">CS 411-Q3<br>30109 Class<br>3:30 pm-4:45 pm<br>1SIEBL 1404</a></td> <td class="dddefault">&nbsp;</td> <td class="ddlabel" rowspan="5"><a href="/BANPROD1/bwskfshd.P_CrseSchdDetl?term_in=120108&amp;crn=30109">CS 411-Q3<br>30109 Class<br>3:30 pm-4:45 pm<br>1SIEBL 1404</a></td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> <tr> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> <tr> <th scope="row" class="ddlabel" rowspan="4">4pm</th> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> <tr> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> <tr> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> <tr> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> <tr> <th scope="row" class="ddlabel" rowspan="4">5pm</th> <td class="dddefault">&nbsp;</td> <td class="ddlabel" rowspan="3"><a href="/BANPROD1/bwskfshd.P_CrseSchdDetl?term_in=120108&amp;crn=41920">ENG 491-SD<br>41920 Class<br>5:00 pm-5:50 pm<br>1AESB 208</a></td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> <tr> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> <tr> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> <tr> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> <td class="dddefault">&nbsp;</td> </tr> </tbody></table> <br> <span class="warningtext">Courses with time conflict:</span> <br> <a href="/BANPROD1/bwskfshd.P_CrseSchdDetl?term_in=120108&amp;crn=41920">ENG 491-SD</a> <br> <br> <!--  ** START OF twbkwbis.P_CloseDoc **  --> <table width="100%" cellspacing="0" cellpadding="0" border="0" summary="This is table displays line separator at end of the page." class="plaintable"><tbody><tr><td width="100%" colspan="2" class="bgtabon"><img width="10" vspace="0" hspace="0" height="3" border="0" name="web_transparent" title="" class="headerImg" src="/wtlgifs/web_transparent.gif"></td></tr></tbody></table> <a class="skiplinks" onblur="window.status=\'\'; return true" onfocus="window.status=\'Skip to top of page\'; return true" onmouseout="window.status=\'\'; return true" onmouseover="window.status=\'Skip to top of page\'; return true" href="#top">Skip to top of page</a> </div> <div class="footerlinksdiv"> <span class="pagefooterlinks"> <map title="Student Schedule Week at a Glance; Registration; Registration and Records Tab Links" name="Student_Schedule_Week_at_a_Glance;_Registration;_Registration_and_Records_Tab_Links_F"> <p> <a class="skiplinks" onblur="window.status=\'\'; return true" onfocus="window.status=\'Skip Student Schedule Week at a Glance; Registration; Registration and Records Tab Links\'; return true" onmouseout="window.status=\'\'; return true" onmouseover="window.status=\'Skip Student Schedule Week at a Glance; Registration; Registration and Records Tab Links\'; return true" href="#skip_Student_Schedule_Week_at_a_Glance;_Registration;_Registration_and_Records_Tab_Links_F">Skip Student Schedule Week at a Glance; Registration; Registration and Records Tab Links</a> </p><p>[ <a onblur="window.status=\'\'; return true" onfocus="window.status=\'Select a Term\'; return true" onmouseout="window.status=\'\'; return true" onmouseover="window.status=\'Select a Term\'; return true" href="/BANPROD1/bwskflib.P_SelDefTerm">Select a Term</a> | <a onblur="window.status=\'\'; return true" onfocus="window.status=\'Add/Drop Classes\'; return true" onmouseout="window.status=\'\'; return true" onmouseover="window.status=\'Add/Drop Classes\'; return true" href="/BANPROD1/twbkwbis.P_GenMenu?name=bmenu.P_RegAgreementAdd">Add/Drop Classes</a> | <a onblur="window.status=\'\'; return true" onfocus="window.status=\'Change Credit Hour or Grade Mode\'; return true" onmouseout="window.status=\'\'; return true" onmouseover="window.status=\'Change Credit Hour or Grade Mode\'; return true" href="/BANPROD1/bwskfreg.P_ChangeCrseOpt">Change Credit Hour or Grade Mode</a> | <a onblur="window.status=\'\'; return true" onfocus="window.status=\'Tuition and Fees Assessment\'; return true" onmouseout="window.status=\'\'; return true" onmouseover="window.status=\'Tuition and Fees Assessment\'; return true" href="/BANPROD1/bwskffee.P_FeeAsses">Tuition and Fees Assessment</a> | <a onblur="window.status=\'\'; return true" onfocus="window.status=\'Look-up or Select Classes\'; return true" onmouseout="window.status=\'\'; return true" onmouseover="window.status=\'Look-up or Select Classes\'; return true" href="/BANPROD1/twbkwbis.P_GenMenu?name=bmenu.P_RegAgreementLook">Look-up or Select Classes</a> | <a onblur="window.status=\'\'; return true" onfocus="window.status=\'Student Schedule &ndash; Concise\'; return true" onmouseout="window.status=\'\'; return true" onmouseover="window.status=\'Student Schedule &ndash; Concise\'; return true" href="/BANPROD1/bwskcrse.P_CrseSchdDetl">Student Schedule &ndash; Concise</a> ] </p></map> </span> <a name="skip_Student_Schedule_Week_at_a_Glance;_Registration;_Registration_and_Records_Tab_Links_F"></a> </div> <div class="pagefooterdiv"> <span class="releasetext">Release: 8.1.1</span> </div> <div class="poweredbydiv"> </div> <div class="div1"></div> <div class="div2"></div> <div class="div3"></div> <div class="div4"></div> <div class="div5"></div> <div class="div6"></div>';
  
  /*var t = document.getElementsByTagName('table')[7];
  var contents = '<thead><tr><th></th><th>Monday</th><th class="gray">Tuesday</th><th>Wednesday</th><th class="gray">Thursday</th><th>Friday</th></tr></thead><tbody><tr id="courses"><th><h3>11:00 AM</h3><h3>12:00 PM</h3><h3>1:00 PM</h3><h3>2:00 PM</h3><h3>3:00 PM</h3><h3>4:00 PM</h3><h3>5:00 PM</h3></th><td><div class="day-container"><div class="class course0" style="height: 50px; top: 0px;" onclick="WAAG.showDetails(\'ECE313\',0);" id="ECE3130">ECE 313<br><span title="Everitt Laboratory">EVRT 163</span><br>11:00 am - 11:50 am</div></div></td><td class="gray"><div class="day-container"><div class="class course1" style="height: 80px; top: 0px;" onclick="WAAG.showDetails(\'ECE391\',0);" id="ECE3910">ECE 391<br><span title="Material Sciences E   ngineering Building">MSEB 119</span><br>11:00 am - 12:20 pm</div><div class="class course1" style="height: 50px; top: 180px;" onclick="WAAG.showDetails(\'ECE391\',2);" id="ECE3912">ECE 391<br><span title="Everitt Laboratory">EVRT 168</span><br>2:00 pm - 2:50 pm</div><div class="class course3" style="height: 75px; top: 270px;" onclick="WAAG.showDetails(\'CS411\',0);" id="CS4110">CS 411<br><span title="Siebel Center">SIEBL 1404</span><br>3:30 pm - 4:45 pm</div><div class="class course4" style="height: 50px; top: 360px;" onclick="WAAG.showDetails(\'ENG491\',0);" id="ENG4910">ENG 491<br><span title="undefined">AESB 208</span><br>5:00 pm - 5:50 pm</div></div></td><td><div class="day-container"><div class="class course0" style="height: 50px; top: 0px;" onclick="WAAG.showDetails(\'ECE313\',1);" id="ECE3131">ECE 313<br><span title="Everitt Laboratory">EVRT 163</span><br>11:00 am - 11:50 am</div><div class="class course2" style="height: 75px; top: 90px;" onclick="WAAG.showDetails(\'CS465\',0);" id="CS4650">CS 465<br><span title="Siebel Center">SIEBL 1109</span><br>12:30 pm - 1:45 pm</div></div></td><td class="gray"><div class="day-container"><div class="class course1" style="height: 80px; top: 0px;" onclick="WAAG.showDetails(\'ECE391\',1);" id="ECE3911">ECE 391<br><span title="Material Sciences E   ngineering Building">MSEB 119</span><br>11:00 am - 12:20 pm</div><div class="class course3" style="height: 75px; top: 270px;" onclick="WAAG.showDetails(\'CS411\',1);" id="CS4111">CS 411<br><span title="Siebel Center">SIEBL 1404</span><br>3:30 pm - 4:45 pm</div></div></td><td><div class="day-container"><div class="class course0" style="height: 50px; top: 0px;" onclick="WAAG.showDetails(\'ECE313\',2);" id="ECE3132">ECE 313<br><span title="Everitt Laboratory">EVRT 163</span><br>11:00 am - 11:50 am</div><div class="class course2" style="height: 75px; top: 90px;" onclick="WAAG.showDetails(\'CS465\',1);" id="CS4651">CS 465<br><span title="Siebel Center">SIEBL 1109</span><br>12:30 pm - 1:45 pm</div></div></td></tr></tbody>';
  t.innerHTML = contents;
  */
 
 // I2CS use local test data
  if (!isI2CS) {
	 // run WAAG initializer
	 var script = document.createElement('script');
	 script.type = 'text/javascript';
	 appendScriptChild(script, "WAAG.run();");
	 (document.getElementsByTagName('head')[0] || document.body).appendChild(script);
  }
}

// helper to run WAAG using test data
function appendScriptChild(node, text) { 
  if (null == node.canHaveChildren || node.canHaveChildren) { 
    node.appendChild(document.createTextNode(text)); 
  } else { 
    node.text = text; 
  } 
} 
// prepends to list of elements
function prependScriptChild(nodeChild, nodeParent) { 
	nodeParent.insertBefore(nodeChild, nodeParent.firstChild);
}

// init vars used in waag.js
function InitVars() { 
 // assign WAAG URL base
 var script = document.createElement('script');
 script.type = 'text/javascript';
 appendScriptChild(script, "window.WWW = '"  + window.WWW + "';");
 prependScriptChild(script, (document.getElementsByTagName('head')[0] || document.body));
 
	// i2cs check
	if (window.WWW == 'http://eai.localhost/uiuc') {
	   isI2CS = true;
	}
}
