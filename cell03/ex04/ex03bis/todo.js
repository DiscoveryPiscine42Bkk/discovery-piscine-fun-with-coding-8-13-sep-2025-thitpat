$(function(){
  function setCookie(name, value, days){
    var d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
  }
  function getCookies(){
    var out = {};
    document.cookie.split(";").forEach(function(c){
      var p = c.trim().split("=");
      if (p[0]) out[p[0]] = decodeURIComponent(p.slice(1).join("="));
    });
    return out;
  }
  function saveAll(){
    var list = [];
    $("#ft_list .item").each(function(){
      list.push($(this).text());
    });
    setCookie("todos", JSON.stringify(list), 365);
  }
  function loadAll(){
    var ck = getCookies();
    if (ck.todos){
      try {
        var list = JSON.parse(ck.todos);
        list.forEach(function(t){ addItem(t); });
      } catch(e){}
    }
  }
  function addItem(text){
    var $div = $('<div class="item"></div>').text(text);
    $("#ft_list").prepend($div);
  }

  $("#new").on("click", function(){
    var t = prompt("Enter a new TO DO:");
    if (t === null) return;
    t = t.trim();
    if (!t) return;
    addItem(t);
    saveAll();
  });

  $("#ft_list").on("click", ".item", function(){
    if (confirm("Do you want to remove this TO DO?")){
      $(this).remove();
      saveAll();
    }
  });

  loadAll();
});