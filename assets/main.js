console.log('EpicWin.io');

window.EPIC = window.EPIC || {};

EPIC.bounty = {
  save : function() {
    if (typeof (Storage) == "undefined") { return false; }
    var bounties = EPIC.bounty.load() || {};
    var bounty = {};
    var new_bounties = bounties;
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      var slug = pair[0] + "";
      var affiliate_value = pair[1] + "";
      if(EPIC.companies[slug]) {
        var bounty = bounties[slug] || EPIC.companies[slug];
        if (!bounty.hasOwnProperty('affiliate_value')) {
          // it's a new bounty, so add the affiliate
          bounty['affiliate_value'] = affiliate_value;
        }
        // do not let someone steal an existing bounty
        if (bounty['affiliate_value'] === affiliate_value) {
          // update the bounty expiry
          var expirationMS = 365 * 24 * 60 * 60 * 1000; // 365 days
          bounty['timestamp'] = new Date().getTime() + expirationMS;
          new_bounties[bounty.slug] = bounty;
        }
      }
    }
    localStorage.setItem('bounties', JSON.stringify(new_bounties));
    console.log(new_bounties);
    return new_bounties;
  },
  load : function(lookup) {
    if (typeof (Storage) == "undefined") { return false; }
    if(!localStorage.getItem('bounties')) { return false; }
    var bounties = JSON.parse(localStorage.getItem('bounties'));
    if (!bounties){ return false; }
    // remove expired bounties
    for (var bounty in bounties) {
      if (bounties.hasOwnProperty(bounty)) {
        console.log(bounties[bounty]);
        if(new Date().getTime() > bounties[bounty]['timestamp']) {
          delete bounties[bounty]
        }
      }
    }
    if(lookup) {
      if(!bounties[lookup]) { return false; }
      return bounties[lookup];
    }
    return bounties;
  }
}

EPIC.bounty.save();

$( document ).ready(function() {
  // fade in .navbar
  $(function () {
    $(window).scroll(function () {
      // set distance user needs to scroll before we start fadeIn
      if ($(this).scrollTop() > 350) {
        $('body').addClass('show-navbar');
      } else {
        $('body').removeClass('show-navbar');
      }
    });
  });

  // https://gist.github.com/anhang/1096149
  // EPIC.storage = {
  //   save : function(key, jsonData, expirationDays){
  //     if (typeof (Storage) == "undefined") { return false; }
  //     var expirationMS = expirationDays * 24 * 60 * 60 * 1000;
  //     var record = {value: JSON.stringify(jsonData), timestamp: new Date().getTime() + expirationMS}
  //     localStorage.setItem(key, JSON.stringify(record));
  //     return jsonData;
  //   },
  //   load : function(key){
  //     if (typeof (Storage) == "undefined") { return false; }
  //     if(!localStorage.getItem(key)) { return false; }
  //     var record = JSON.parse(localStorage.getItem(key));
  //     if (!record){ return false; }
  //     return (new Date().getTime() < record.timestamp && JSON.parse(record.value));
  //   }
  // };

});
