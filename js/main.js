(function(){
var ids=['home','about','projects','resume','contact'],links=document.querySelectorAll('nav a');
function show(){
var id=location.hash.replace('#','');if(ids.indexOf(id)<0)id='home';
ids.forEach(function(p){document.getElementById(p).classList.toggle('on',p===id)});
links.forEach(function(a){if(a.getAttribute('href')==='#'+id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
document.title=document.getElementById(id).dataset.title+' – Nabeel Hussain';
window.scrollTo(0,0);
}
window.addEventListener('hashchange',show);show();
document.getElementById('send').addEventListener('click',function(){
var n=document.getElementById('cn').value,e=document.getElementById('ce').value,m=document.getElementById('cm').value;
var body='Hi Nabeel,\n\n'+m+'\n\nFrom: '+n+(e?' ('+e+')':'');
location.href='mailto:nabeelhussain.se@gmail.com?subject='+encodeURIComponent('Message from your portfolio')+'&body='+encodeURIComponent(body);
});
})();
