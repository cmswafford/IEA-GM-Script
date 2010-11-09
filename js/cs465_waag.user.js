// ==UserScript==
// @name           CS465 WAAG
// @namespace      apps.uillinois.edu
// @include        https://*apps.uillinois.edu/BANPROD1/bwskfshd.P_CrseSchd*
// @include        https://*apps.uillinois.edu/BANPROD1/bwskfshd.p_proc_crse_schd*

window.WWW = 'http://pangolin.sktsoft.com/uiuc';

// Call main()
(function(){ main(); } )();

// All your GM code must be inside this function
function main()
{

  var s = document.createElement('script');
  s.type = 'text/javascript';
  //s.src = 'http://dl.dropbox.com/u/124437/waag.js?time='+uts();
  var time = Math.round(new Date().getTime() / 1000);
  s.src = WWW+'/js/waag.js?time='+time;
  (document.getElementsByTagName('head')[0] || document.body).appendChild(s);

  GM_registerMenuCommand( 'Add Test Data', createCalendar );
}

function createCalendar()
{
  var t = document.getElementsByTagName('table')[7];
  var contents = '<thead><tr><th></th><th>Monday</th><th class="gray">Tuesday</th><th>Wednesday</th><th class="gray">Thursday</th><th>Friday</th></tr></thead><tbody><tr id="courses"><th><h3>11:00 AM</h3><h3>12:00 PM</h3><h3>1:00 PM</h3><h3>2:00 PM</h3><h3>3:00 PM</h3><h3>4:00 PM</h3><h3>5:00 PM</h3></th><td><div class="day-container"><div class="class course0" style="height: 50px; top: 0px;" onclick="WAAG.showDetails(\'ECE313\',0);" id="ECE3130">ECE 313<br><span title="Everitt Laboratory">EVRT 163</span><br>11:00 am - 11:50 am</div></div></td><td class="gray"><div class="day-container"><div class="class course1" style="height: 80px; top: 0px;" onclick="WAAG.showDetails(\'ECE391\',0);" id="ECE3910">ECE 391<br><span title="Material Sciences E   ngineering Building">MSEB 119</span><br>11:00 am - 12:20 pm</div><div class="class course1" style="height: 50px; top: 180px;" onclick="WAAG.showDetails(\'ECE391\',2);" id="ECE3912">ECE 391<br><span title="Everitt Laboratory">EVRT 168</span><br>2:00 pm - 2:50 pm</div><div class="class course3" style="height: 75px; top: 270px;" onclick="WAAG.showDetails(\'CS411\',0);" id="CS4110">CS 411<br><span title="Siebel Center">SIEBL 1404</span><br>3:30 pm - 4:45 pm</div><div class="class course4" style="height: 50px; top: 360px;" onclick="WAAG.showDetails(\'ENG491\',0);" id="ENG4910">ENG 491<br><span title="undefined">AESB 208</span><br>5:00 pm - 5:50 pm</div></div></td><td><div class="day-container"><div class="class course0" style="height: 50px; top: 0px;" onclick="WAAG.showDetails(\'ECE313\',1);" id="ECE3131">ECE 313<br><span title="Everitt Laboratory">EVRT 163</span><br>11:00 am - 11:50 am</div><div class="class course2" style="height: 75px; top: 90px;" onclick="WAAG.showDetails(\'CS465\',0);" id="CS4650">CS 465<br><span title="Siebel Center">SIEBL 1109</span><br>12:30 pm - 1:45 pm</div></div></td><td class="gray"><div class="day-container"><div class="class course1" style="height: 80px; top: 0px;" onclick="WAAG.showDetails(\'ECE391\',1);" id="ECE3911">ECE 391<br><span title="Material Sciences E   ngineering Building">MSEB 119</span><br>11:00 am - 12:20 pm</div><div class="class course3" style="height: 75px; top: 270px;" onclick="WAAG.showDetails(\'CS411\',1);" id="CS4111">CS 411<br><span title="Siebel Center">SIEBL 1404</span><br>3:30 pm - 4:45 pm</div></div></td><td><div class="day-container"><div class="class course0" style="height: 50px; top: 0px;" onclick="WAAG.showDetails(\'ECE313\',2);" id="ECE3132">ECE 313<br><span title="Everitt Laboratory">EVRT 163</span><br>11:00 am - 11:50 am</div><div class="class course2" style="height: 75px; top: 90px;" onclick="WAAG.showDetails(\'CS465\',1);" id="CS4651">CS 465<br><span title="Siebel Center">SIEBL 1109</span><br>12:30 pm - 1:45 pm</div></div></td></tr></tbody>';

  t.innerHTML = contents;
}
