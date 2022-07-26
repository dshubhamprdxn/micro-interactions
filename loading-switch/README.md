Codepen link: https://codepen.io/msanjeetaxioned/pen/XWEjyYL

# Steps:
1. To Turn Switch 'On':
When the 'Off' button is clicked the loading animation starts playing. Once the loading has finished call the playT3() function(in callback). It will stop the loading animation and then turn button to 'On'. 
2. To Turn Switch 'Off':
Similarly when the Switch is 'On' and you click it to turn it off. The 'reverse loading' animation will be played. Now call 't4.pause(); t1.reverse();' methods when the devices get turned off(In callback). It will stop the turning off animation and will turn button to 'Off'.