$ ->
  $('body').on 'keydown', (e) -> if e.which == 114 then Dyalog.showPrefs(); false # <F3>
  Dyalog.showPrefs = ->
    $d = $ '<p><label>Map leader: <input class="prefMapLeader" size="1"></label>'
    $d.dialog modal: true, title: 'Preferences'
    $('.prefMapLeader', $d).val Dyalog.getMapLeader()
      .on 'change', -> Dyalog.setMapLeader $(@).val(); return
      .on 'keydown', (e) -> if e.which == 13 then $d.dialog 'close'; false
    return
