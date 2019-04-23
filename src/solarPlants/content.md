Demand for renewable energy has been growing steadily in the last decade, with solar power outstripping the growth in all other renewable forms of power generation.

Solar panels are getting cheaper, and are becoming an economically viable source of renewable energy in many parts of the world.

**In addition to businesses and governments, individuals are increasingly finding that installing solar power arrays is viable at a lower scale.**

Capturing the optimal amount of energy from a solar panel is, however, a tricky business.

In order for solar panels to operate efficiently, they need to be kept clean and pointed at an optimal angle to the sun that balances power generation and prevents overheating.

_So how do you keep everything under control and get notified when something isn't right and requires your attention?_

## Software is eating the world

One solution is to capitalise on small embedded devices that

- measure the performance and efficiency of the cells
- monitor the environment
- drive the actuators to track the sun during the day

The embedded computer collects data and sends them to a central location where is then aggregated, processed and stored.

If the solar panel is dropping in efficiency, an operator can be alerted to take action.

In larger plants, the solar arrays' data are passed through a wired network, but it's not uncommon to see those embedded computers connecting wirelessly.

**Imagine controlling your solar panels over 5G:** the beauty of not having to deal with extra cables and the horror of long responses, dropped connections and timeouts.

```include
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 663" id="over_the_air">
  <defs>
    <linearGradient id="linearGradient-1" x1="50%" x2="50%" y1="0%" y2="100%">
      <stop offset="0%" stop-color="#E8E8E8"/>
      <stop offset="100%" stop-color="#B7B3B3"/>
    </linearGradient>
    <linearGradient x1="50%" x2="50%" y1="0%" y2="100%">
      <stop offset="0%" stop-color="#BBB7B7"/>
      <stop offset="100%" stop-color="#888"/>
    </linearGradient>
  </defs>
  <g fill="none" fill-rule="evenodd">
    <g id="over_the_air-animejs-wifi-1-3" fill="#F8E71C" fill-rule="nonzero" transform="translate(127 239)">
      <path d="M33.9202924,0.00677510358 C47.0840936,0.186992844 58.0877778,4.70192149 67.2097661,13.7846246 C69.0995322,15.6667482 69.5312865,17.9282776 68.3221053,19.4879063 C67.0887135,21.0787005 64.6380702,21.2562082 62.4268421,19.861892 C61.7950643,19.4521489 61.2056808,18.9795909 60.6675439,18.4513156 C46.1345029,4.4918933 23.8446784,4.0379614 8.70099415,17.4187899 C7.23491228,18.7141895 5.63298246,19.599018 3.6248538,19.4608059 C2.22064327,19.3645994 1.09081871,18.7575502 0.458654971,17.4404702 C-0.189649123,16.0854496 0.197719298,14.8510258 1.04374269,13.7331338 C1.42505114,13.2529055 1.85014104,12.8096874 2.31345029,12.4092787 C11.407193,4.1897237 22.1216959,0.211383215 33.9202924,0.00677510358 Z"/>
    </g>
    <g id="over_the_air-animejs-wifi-1-2" fill="#FFF67F" fill-rule="nonzero" transform="translate(137 254)">
      <path d="M24.8564327,0.426909564 C33.9246199,0.611192366 41.4245029,4.07055997 48.0945029,9.60446411 C48.9311111,10.2982347 49.524269,11.239974 49.9210526,12.2670796 C50.4254386,13.5706094 50.5088304,14.8822694 49.5350292,16.0123565 C48.5370175,17.1681891 47.2014035,17.360602 45.7918129,17.0421722 C44.2773099,16.700707 43.1111696,15.7576127 41.9773099,14.7386372 C32.9346784,6.58412318 19.5233918,6.02043461 9.96561404,13.3836166 C9.10883041,14.0435116 8.32333333,14.7969031 7.51093567,15.513709 C6.26409357,16.6126307 4.8625731,17.2982711 3.15842105,17.161414 C0.939122807,16.9839063 -0.349415205,15.0963626 0.259883041,12.95001 C0.57884848,11.8522711 1.19669809,10.8665076 2.04339181,10.1044667 C8.57350877,4.06107482 16.1594737,0.555636521 24.8564327,0.426909564 Z"/>
    </g>
    <g id="over_the_air-animejs-wifi-1-1" fill="#FFF9AC" fill-rule="nonzero" transform="translate(146 270)">
      <path d="M17.5484795,0.493388853 C22.2444185,0.579108596 26.7097055,2.56008934 29.942924,5.99206246 C31.0848538,7.19396573 31.8730409,8.54898634 31.4224561,10.3281284 C30.8521637,12.5950779 28.1459649,13.657414 26.2615789,11.8985973 C20.3972515,6.42431403 12.2396491,6.38366341 6.02157895,11.5855875 C4.28649123,13.0368146 3.17280702,13.1560564 1.78608187,12.0368094 C0.399356725,10.9175624 0.0630994152,9.02324355 0.985789474,7.29423726 C1.48345029,6.36198308 2.21111111,5.62756192 3.01812865,4.96360182 C6.57976608,2.0421774 11.1730409,0.483903709 17.5484795,0.493388853 Z"/>
    </g>
    <g id="over_the_air-animejs-wifi-2-3" fill="#F8E71C" fill-rule="nonzero" transform="translate(366 239)">
      <path d="M33.9202924,0.00677510358 C47.0840936,0.186992844 58.0877778,4.70192149 67.2097661,13.7846246 C69.0995322,15.6667482 69.5312865,17.9282776 68.3221053,19.4879063 C67.0887135,21.0787005 64.6380702,21.2562082 62.4268421,19.861892 C61.7950643,19.4521489 61.2056808,18.9795909 60.6675439,18.4513156 C46.1345029,4.4918933 23.8446784,4.0379614 8.70099415,17.4187899 C7.23491228,18.7141895 5.63298246,19.599018 3.6248538,19.4608059 C2.22064327,19.3645994 1.09081871,18.7575502 0.458654971,17.4404702 C-0.189649123,16.0854496 0.197719298,14.8510258 1.04374269,13.7331338 C1.42505114,13.2529055 1.85014104,12.8096874 2.31345029,12.4092787 C11.407193,4.1897237 22.1216959,0.211383215 33.9202924,0.00677510358 Z"/>
    </g>
    <g id="over_the_air-animejs-wifi-2-2" fill="#FFF67F" fill-rule="nonzero" transform="translate(376 254)">
      <path d="M24.8564327,0.426909564 C33.9246199,0.611192366 41.4245029,4.07055997 48.0945029,9.60446411 C48.9311111,10.2982347 49.524269,11.239974 49.9210526,12.2670796 C50.4254386,13.5706094 50.5088304,14.8822694 49.5350292,16.0123565 C48.5370175,17.1681891 47.2014035,17.360602 45.7918129,17.0421722 C44.2773099,16.700707 43.1111696,15.7576127 41.9773099,14.7386372 C32.9346784,6.58412318 19.5233918,6.02043461 9.96561404,13.3836166 C9.10883041,14.0435116 8.32333333,14.7969031 7.51093567,15.513709 C6.26409357,16.6126307 4.8625731,17.2982711 3.15842105,17.161414 C0.939122807,16.9839063 -0.349415205,15.0963626 0.259883041,12.95001 C0.57884848,11.8522711 1.19669809,10.8665076 2.04339181,10.1044667 C8.57350877,4.06107482 16.1594737,0.555636521 24.8564327,0.426909564 Z"/>
    </g>
    <g id="over_the_air-animejs-down-1" fill="#FF003C" fill-rule="nonzero" transform="translate(213 242)">
      <g>
        <path d="M29.53128,25.84014 L25.84008,29.53134 L20.39988,24.09114 L14.95968,29.53134 L11.26848,25.84014 L16.70868,20.39994 L11.26848,14.95974 L14.95968,11.26854 L20.39988,16.70874 L25.84008,11.26854 L29.53128,14.95974 L24.09168,20.39994 L29.53128,25.84014 Z M34.84248,5.95794 C30.95628,2.13714 25.84008,-6e-05 20.39988,-6e-05 C14.95968,-6e-05 9.77928,2.13714 5.95788,5.95794 C2.13708,9.84354 -0.00012,14.95974 -0.00012,20.39994 C-0.00012,25.84014 2.13708,31.02054 5.95788,34.84194 C9.84348,38.66334 14.95968,40.79994 20.39988,40.79994 C25.84008,40.79994 30.95628,38.66334 34.84248,34.84194 C38.66328,30.95634 40.79988,25.84014 40.79988,20.39994 C40.79988,14.95974 38.66328,9.77874 34.84248,5.95794 Z"/>
      </g>
    </g>
    <g id="over_the_air-animejs-down-3" fill="#FF003C" fill-rule="nonzero" transform="translate(690 242)">
      <g>
        <path d="M29.53128,25.84014 L25.84008,29.53134 L20.39988,24.09114 L14.95968,29.53134 L11.26848,25.84014 L16.70868,20.39994 L11.26848,14.95974 L14.95968,11.26854 L20.39988,16.70874 L25.84008,11.26854 L29.53128,14.95974 L24.09168,20.39994 L29.53128,25.84014 Z M34.84248,5.95794 C30.95628,2.13714 25.84008,-6e-05 20.39988,-6e-05 C14.95968,-6e-05 9.77928,2.13714 5.95788,5.95794 C2.13708,9.84354 -0.00012,14.95974 -0.00012,20.39994 C-0.00012,25.84014 2.13708,31.02054 5.95788,34.84194 C9.84348,38.66334 14.95968,40.79994 20.39988,40.79994 C25.84008,40.79994 30.95628,38.66334 34.84248,34.84194 C38.66328,30.95634 40.79988,25.84014 40.79988,20.39994 C40.79988,14.95974 38.66328,9.77874 34.84248,5.95794 Z"/>
      </g>
    </g>
    <g id="over_the_air-animejs-down-2" fill="#FF003C" fill-rule="nonzero" transform="translate(451 242)">
      <g>
        <path d="M29.53128,25.84014 L25.84008,29.53134 L20.39988,24.09114 L14.95968,29.53134 L11.26848,25.84014 L16.70868,20.39994 L11.26848,14.95974 L14.95968,11.26854 L20.39988,16.70874 L25.84008,11.26854 L29.53128,14.95974 L24.09168,20.39994 L29.53128,25.84014 Z M34.84248,5.95794 C30.95628,2.13714 25.84008,-6e-05 20.39988,-6e-05 C14.95968,-6e-05 9.77928,2.13714 5.95788,5.95794 C2.13708,9.84354 -0.00012,14.95974 -0.00012,20.39994 C-0.00012,25.84014 2.13708,31.02054 5.95788,34.84194 C9.84348,38.66334 14.95968,40.79994 20.39988,40.79994 C25.84008,40.79994 30.95628,38.66334 34.84248,34.84194 C38.66328,30.95634 40.79988,25.84014 40.79988,20.39994 C40.79988,14.95974 38.66328,9.77874 34.84248,5.95794 Z"/>
      </g>
    </g>
    <g id="over_the_air-animejs-wifi-2-1" fill="#FFF9AC" fill-rule="nonzero" transform="translate(385 270)">
      <path d="M17.5484795,0.493388853 C22.2444185,0.579108596 26.7097055,2.56008934 29.942924,5.99206246 C31.0848538,7.19396573 31.8730409,8.54898634 31.4224561,10.3281284 C30.8521637,12.5950779 28.1459649,13.657414 26.2615789,11.8985973 C20.3972515,6.42431403 12.2396491,6.38366341 6.02157895,11.5855875 C4.28649123,13.0368146 3.17280702,13.1560564 1.78608187,12.0368094 C0.399356725,10.9175624 0.0630994152,9.02324355 0.985789474,7.29423726 C1.48345029,6.36198308 2.21111111,5.62756192 3.01812865,4.96360182 C6.57976608,2.0421774 11.1730409,0.483903709 17.5484795,0.493388853 Z"/>
    </g>
    <g id="over_the_air-animejs-wifi-3-3" fill="#F8E71C" fill-rule="nonzero" transform="translate(604 239)">
      <path d="M33.9202924,0.00677510358 C47.0840936,0.186992844 58.0877778,4.70192149 67.2097661,13.7846246 C69.0995322,15.6667482 69.5312865,17.9282776 68.3221053,19.4879063 C67.0887135,21.0787005 64.6380702,21.2562082 62.4268421,19.861892 C61.7950643,19.4521489 61.2056808,18.9795909 60.6675439,18.4513156 C46.1345029,4.4918933 23.8446784,4.0379614 8.70099415,17.4187899 C7.23491228,18.7141895 5.63298246,19.599018 3.6248538,19.4608059 C2.22064327,19.3645994 1.09081871,18.7575502 0.458654971,17.4404702 C-0.189649123,16.0854496 0.197719298,14.8510258 1.04374269,13.7331338 C1.42505114,13.2529055 1.85014104,12.8096874 2.31345029,12.4092787 C11.407193,4.1897237 22.1216959,0.211383215 33.9202924,0.00677510358 Z"/>
    </g>
    <g id="over_the_air-animejs-wifi-3-2" fill="#FFF67F" fill-rule="nonzero" transform="translate(614 254)">
      <path d="M24.8564327,0.426909564 C33.9246199,0.611192366 41.4245029,4.07055997 48.0945029,9.60446411 C48.9311111,10.2982347 49.524269,11.239974 49.9210526,12.2670796 C50.4254386,13.5706094 50.5088304,14.8822694 49.5350292,16.0123565 C48.5370175,17.1681891 47.2014035,17.360602 45.7918129,17.0421722 C44.2773099,16.700707 43.1111696,15.7576127 41.9773099,14.7386372 C32.9346784,6.58412318 19.5233918,6.02043461 9.96561404,13.3836166 C9.10883041,14.0435116 8.32333333,14.7969031 7.51093567,15.513709 C6.26409357,16.6126307 4.8625731,17.2982711 3.15842105,17.161414 C0.939122807,16.9839063 -0.349415205,15.0963626 0.259883041,12.95001 C0.57884848,11.8522711 1.19669809,10.8665076 2.04339181,10.1044667 C8.57350877,4.06107482 16.1594737,0.555636521 24.8564327,0.426909564 Z"/>
    </g>
    <g id="over_the_air-animejs-wifi-3-1" fill="#FFF9AC" fill-rule="nonzero" transform="translate(623 270)">
      <path d="M17.5484795,0.493388853 C22.2444185,0.579108596 26.7097055,2.56008934 29.942924,5.99206246 C31.0848538,7.19396573 31.8730409,8.54898634 31.4224561,10.3281284 C30.8521637,12.5950779 28.1459649,13.657414 26.2615789,11.8985973 C20.3972515,6.42431403 12.2396491,6.38366341 6.02157895,11.5855875 C4.28649123,13.0368146 3.17280702,13.1560564 1.78608187,12.0368094 C0.399356725,10.9175624 0.0630994152,9.02324355 0.985789474,7.29423726 C1.48345029,6.36198308 2.21111111,5.62756192 3.01812865,4.96360182 C6.57976608,2.0421774 11.1730409,0.483903709 17.5484795,0.493388853 Z"/>
    </g>
    <g transform="translate(77 87)">
      <rect width="640" height="102" x="3.5" y="3.5" fill="#34302E" stroke="#7CB050" stroke-width="7"/>
      <text fill="#FFF" font-size="46" font-weight="bold" letter-spacing=".23" class="sans-serif">
        <tspan x="217.094" y="70">BACKEND</tspan>
      </text>
    </g>
    <g fill-rule="nonzero" transform="translate(307 297)">
      <rect width="182.6" height="282.6" x="1.2" y="1.2" fill="url(#linearGradient-1)" stroke="url(#linearGradient-2)" stroke-width="2.4"/>
      <rect width="31.96" height="31.994" x="143.534" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="1" height="268.632" x="167.457" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="153.103" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="133.966" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="119.612" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="98.879" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="84.526" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="65.388" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="51.034" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="31.897" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="17.543" y="8.006" fill="#C3BFBF"/>
    </g>
    <g fill-rule="nonzero" transform="translate(69 297)">
      <rect width="182.6" height="282.6" x="1.2" y="1.2" fill="url(#linearGradient-1)" stroke="url(#linearGradient-2)" stroke-width="2.4"/>
      <rect width="31.96" height="31.994" x="143.534" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="1" height="268.632" x="167.457" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="153.103" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="133.966" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="119.612" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="98.879" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="84.526" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="65.388" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="51.034" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="31.897" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="17.543" y="8.006" fill="#C3BFBF"/>
    </g>
    <g fill-rule="nonzero" transform="translate(546 297)">
      <rect width="182.6" height="282.6" x="1.2" y="1.2" fill="url(#linearGradient-1)" stroke="url(#linearGradient-2)" stroke-width="2.4"/>
      <rect width="31.96" height="31.994" x="143.534" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="1" height="268.632" x="167.457" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="153.103" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="133.966" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="119.612" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="98.879" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="84.526" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="65.388" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="51.034" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="31.897" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="17.543" y="8.006" fill="#C3BFBF"/>
    </g>
  </g>
</svg>
<script src="anime.min.js"></script>
<script src="isScrolledIntoView.js"></script>
<script>
(function() {
  const svg = document.querySelector('#over_the_air')
  function run(faulty) {
    const basicTimeline = anime.timeline({
      autoplay: true,
      loop: false,
    });
    var rnd = random(1, 3)
    basicTimeline
    .add({
      begin: function() {
        document.querySelector('#over_the_air-animejs-down-1').style.opacity = 0;
        document.querySelector('#over_the_air-animejs-down-2').style.opacity = 0;
        document.querySelector('#over_the_air-animejs-down-3').style.opacity = 0;
      },
      targets: ['#over_the_air-animejs-wifi-3-1', '#over_the_air-animejs-wifi-2-1', '#over_the_air-animejs-wifi-1-1'],
      opacity: [0, 1],
      easing: 'easeInExpo',
    })
    .add({
      targets: ['#over_the_air-animejs-wifi-3-2', '#over_the_air-animejs-wifi-2-2', '#over_the_air-animejs-wifi-1-2'],
      opacity: [0, 1],
      easing: 'easeInExpo',
    })
    .add({
      targets: ['#over_the_air-animejs-wifi-3-3', '#over_the_air-animejs-wifi-2-3', '#over_the_air-animejs-wifi-1-3'],
      opacity: [0, 1],
      easing: 'easeInExpo',
    })
    .add({
      targets: '#over_the_air-animejs-down-' + faulty,
      opacity: [0, 1],
      easing: 'easeInExpo',
    })
    .add({})
    .add({
      targets: ['#over_the_air-animejs-wifi-3-3', '#over_the_air-animejs-wifi-2-3', '#over_the_air-animejs-wifi-1-3',
      '#over_the_air-animejs-wifi-3-2', '#over_the_air-animejs-wifi-2-2', '#over_the_air-animejs-wifi-1-2',
      '#over_the_air-animejs-wifi-3-1', '#over_the_air-animejs-wifi-2-1', '#over_the_air-animejs-wifi-1-1',
      '#over_the_air-animejs-down-' + faulty,
    ],
      opacity: [1, 0],
      easing: 'easeOutExpo',
    })
    .finished.then(() => run(random(1, 3)));
  }
  run(random(1, 3));
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
})();
</script>
```

In a setup like that, deploying and managing applications becomes a real challenge.

## Designing the internet of things at scale

If you're managing hundreds or thousands of devices, it's not practical to attend every device in person in order to install software and firmware updates.

You should design a system that can be updated remotely.

```include
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 725" id="ota_updates">
  <defs>
    <linearGradient id="linearGradient-1" x1="50%" x2="50%" y1="0%" y2="100%">
      <stop offset="0%" stop-color="#E8E8E8"/>
      <stop offset="100%" stop-color="#B7B3B3"/>
    </linearGradient>
    <linearGradient x1="50%" x2="50%" y1="0%" y2="100%">
      <stop offset="0%" stop-color="#BBB7B7"/>
      <stop offset="100%" stop-color="#888"/>
    </linearGradient>
  </defs>
  <g fill="none" fill-rule="evenodd">
    <g fill-rule="nonzero" transform="translate(553 301)">
      <rect width="182.6" height="282.6" x="1.2" y="1.2" fill="url(#linearGradient-1)" stroke="url(#linearGradient-2)" stroke-width="2.4"/>
      <rect width="31.96" height="31.994" x="143.534" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="1" height="268.632" x="167.457" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="153.103" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="133.966" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="119.612" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="98.879" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="84.526" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="65.388" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="51.034" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="31.897" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="17.543" y="8.006" fill="#C3BFBF"/>
    </g>
    <g fill-rule="nonzero" transform="translate(314 301)">
      <rect width="182.6" height="282.6" x="1.2" y="1.2" fill="url(#linearGradient-1)" stroke="url(#linearGradient-2)" stroke-width="2.4"/>
      <rect width="31.96" height="31.994" x="143.534" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="1" height="268.632" x="167.457" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="153.103" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="133.966" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="119.612" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="98.879" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="84.526" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="65.388" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="51.034" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="31.897" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="17.543" y="8.006" fill="#C3BFBF"/>
    </g>
    <g fill-rule="nonzero" transform="translate(76 301)">
      <rect width="182.6" height="282.6" x="1.2" y="1.2" fill="url(#linearGradient-1)" stroke="url(#linearGradient-2)" stroke-width="2.4"/>
      <rect width="31.96" height="31.994" x="143.534" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="244.972" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="211.348" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="177.725" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="144.101" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="110.478" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="76.854" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="43.23" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="143.534" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="110.043" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="76.552" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="43.06" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="31.96" height="31.994" x="9.569" y="8.006" fill="#1B4996" rx="7.022"/>
      <rect width="1" height="268.632" x="167.457" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="153.103" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="133.966" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="119.612" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="98.879" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="84.526" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="65.388" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="51.034" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="31.897" y="8.006" fill="#C3BFBF"/>
      <rect width="1" height="268.632" x="17.543" y="8.006" fill="#C3BFBF"/>
    </g>
    <g id="ota_updates-animejs-app1" transform="translate(90 439)">
      <g>
        <path fill="#00C176" d="M158.400002,134.890599 C158.400002,135.741965 157.904038,136.432001 157.291993,136.432001 L1.108009,136.432001 C0.49596405,136.432001 0,135.741965 0,134.890599 L-4.4408921e-16,3.96000004 C-7.11925298e-16,1.77295241 1.77295241,-1.29209222e-14 3.96000004,-1.33226763e-14 L154.440002,-4.4408921e-16 C156.627049,-8.45843342e-16 158.400002,1.77295241 158.400002,3.96000004 L158.400002,134.890599 Z"/>
        <text fill="#FFF" font-size="26.928" font-weight="bold" class="sans-serif">
          <tspan x="51.516" y="86.234">APP</tspan>
        </text>
        <path fill="#CCC" d="M3.96000004,0 L154.440002,0 C156.627049,-4.01754132e-16 158.400002,1.77295241 158.400002,3.96000004 L158.400002,18.2160002 L0,18.2160002 L0,3.96000004 C-2.67836088e-16,1.77295241 1.77295241,-4.23350776e-17 3.96000004,-4.4408921e-16 Z"/>
        <path fill="#E74C3C" d="M13.4640001,9.9000001 C13.4640001,11.8685633 11.8685633,13.4640001 9.9000001,13.4640001 C7.9314369,13.4640001 6.33600006,11.8685633 6.33600006,9.9000001 C6.33600006,7.9314369 7.9314369,6.33600006 9.9000001,6.33600006 C11.8685633,6.33600006 13.4640001,7.9314369 13.4640001,9.9000001"/>
        <path fill="#F1C40F" d="M26.1360003,9.9000001 C26.1360003,11.8685633 24.5405634,13.4640001 22.5720002,13.4640001 C20.603437,13.4640001 19.0080002,11.8685633 19.0080002,9.9000001 C19.0080002,7.9314369 20.603437,6.33600006 22.5720002,6.33600006 C24.5405634,6.33600006 26.1360003,7.9314369 26.1360003,9.9000001"/>
        <path fill="#2ECC71" d="M38.0160004,9.9000001 C38.0160004,11.8685633 36.4205635,13.4640001 34.4520003,13.4640001 C32.4834372,13.4640001 30.8880003,11.8685633 30.8880003,9.9000001 C30.8880003,7.9314369 32.4834372,6.33600006 34.4520003,6.33600006 C36.4205635,6.33600006 38.0160004,7.9314369 38.0160004,9.9000001"/>
      </g>
    </g>
    <g id="ota_updates-animejs-app2" transform="translate(328 439)">
      <g>
        <path fill="#00C176" d="M158.400002,134.890599 C158.400002,135.741965 157.904038,136.432001 157.291993,136.432001 L1.108009,136.432001 C0.49596405,136.432001 0,135.741965 0,134.890599 L-4.4408921e-16,3.96000004 C-7.11925298e-16,1.77295241 1.77295241,-1.29209222e-14 3.96000004,-1.33226763e-14 L154.440002,-4.4408921e-16 C156.627049,-8.45843342e-16 158.400002,1.77295241 158.400002,3.96000004 L158.400002,134.890599 Z"/>
        <text fill="#FFF" font-size="26.928" font-weight="bold" class="sans-serif">
          <tspan x="51.516" y="86.234">APP</tspan>
        </text>
        <path fill="#CCC" d="M3.96000004,0 L154.440002,0 C156.627049,-4.01754132e-16 158.400002,1.77295241 158.400002,3.96000004 L158.400002,18.2160002 L0,18.2160002 L0,3.96000004 C-2.67836088e-16,1.77295241 1.77295241,-4.23350776e-17 3.96000004,-4.4408921e-16 Z"/>
        <path fill="#E74C3C" d="M13.4640001,9.9000001 C13.4640001,11.8685633 11.8685633,13.4640001 9.9000001,13.4640001 C7.9314369,13.4640001 6.33600006,11.8685633 6.33600006,9.9000001 C6.33600006,7.9314369 7.9314369,6.33600006 9.9000001,6.33600006 C11.8685633,6.33600006 13.4640001,7.9314369 13.4640001,9.9000001"/>
        <path fill="#F1C40F" d="M26.1360003,9.9000001 C26.1360003,11.8685633 24.5405634,13.4640001 22.5720002,13.4640001 C20.603437,13.4640001 19.0080002,11.8685633 19.0080002,9.9000001 C19.0080002,7.9314369 20.603437,6.33600006 22.5720002,6.33600006 C24.5405634,6.33600006 26.1360003,7.9314369 26.1360003,9.9000001"/>
        <path fill="#2ECC71" d="M38.0160004,9.9000001 C38.0160004,11.8685633 36.4205635,13.4640001 34.4520003,13.4640001 C32.4834372,13.4640001 30.8880003,11.8685633 30.8880003,9.9000001 C30.8880003,7.9314369 32.4834372,6.33600006 34.4520003,6.33600006 C36.4205635,6.33600006 38.0160004,7.9314369 38.0160004,9.9000001"/>
      </g>
    </g>
    <g id="ota_updates-animejs-app3" transform="translate(567 439)">
      <g>
        <path fill="#00C176" d="M158.400002,134.890599 C158.400002,135.741965 157.904038,136.432001 157.291993,136.432001 L1.108009,136.432001 C0.49596405,136.432001 0,135.741965 0,134.890599 L-4.4408921e-16,3.96000004 C-7.11925298e-16,1.77295241 1.77295241,-1.29209222e-14 3.96000004,-1.33226763e-14 L154.440002,-4.4408921e-16 C156.627049,-8.45843342e-16 158.400002,1.77295241 158.400002,3.96000004 L158.400002,134.890599 Z"/>
        <text fill="#FFF" font-size="26.928" font-weight="bold" class="sans-serif">
          <tspan x="51.516" y="86.234">APP</tspan>
        </text>
        <path fill="#CCC" d="M3.96000004,0 L154.440002,0 C156.627049,-4.01754132e-16 158.400002,1.77295241 158.400002,3.96000004 L158.400002,18.2160002 L0,18.2160002 L0,3.96000004 C-2.67836088e-16,1.77295241 1.77295241,-4.23350776e-17 3.96000004,-4.4408921e-16 Z"/>
        <path fill="#E74C3C" d="M13.4640001,9.9000001 C13.4640001,11.8685633 11.8685633,13.4640001 9.9000001,13.4640001 C7.9314369,13.4640001 6.33600006,11.8685633 6.33600006,9.9000001 C6.33600006,7.9314369 7.9314369,6.33600006 9.9000001,6.33600006 C11.8685633,6.33600006 13.4640001,7.9314369 13.4640001,9.9000001"/>
        <path fill="#F1C40F" d="M26.1360003,9.9000001 C26.1360003,11.8685633 24.5405634,13.4640001 22.5720002,13.4640001 C20.603437,13.4640001 19.0080002,11.8685633 19.0080002,9.9000001 C19.0080002,7.9314369 20.603437,6.33600006 22.5720002,6.33600006 C24.5405634,6.33600006 26.1360003,7.9314369 26.1360003,9.9000001"/>
        <path fill="#2ECC71" d="M38.0160004,9.9000001 C38.0160004,11.8685633 36.4205635,13.4640001 34.4520003,13.4640001 C32.4834372,13.4640001 30.8880003,11.8685633 30.8880003,9.9000001 C30.8880003,7.9314369 32.4834372,6.33600006 34.4520003,6.33600006 C36.4205635,6.33600006 38.0160004,7.9314369 38.0160004,9.9000001"/>
      </g>
    </g>
    <g transform="translate(77 91)">
      <rect width="640" height="102" x="3.5" y="3.5" fill="#34302E" stroke="#7CB050" stroke-width="7"/>
      <text fill="#FFF" font-size="46" font-weight="bold" letter-spacing=".23" class="sans-serif">
        <tspan x="217.094" y="70">BACKEND</tspan>
      </text>
    </g>
    <g fill-rule="nonzero" transform="rotate(180 238 146)">
      <g id="ota_updates-animejs-wifi-3" fill="#F8E71C">
        <path d="M67.8405848,0.0133962275 C94.1681871,0.36973585 116.175556,9.29698113 134.419532,27.2559623 C138.199064,30.977434 139.062573,35.4490943 136.644211,38.5329057 C134.177427,41.6783396 129.27614,42.0293208 124.853684,39.2723774 C123.590129,38.4622036 122.411362,37.5278275 121.335088,36.483283 C92.2690058,8.88169811 47.6893567,7.98415094 17.4019883,34.4416981 C14.4698246,37.0030566 11.2659649,38.7526038 7.2497076,38.4793208 C4.44128655,38.2890943 2.18163743,37.0887925 0.917309942,34.484566 C-0.379298246,31.8053208 0.395438596,29.3645283 2.08748538,27.1541509 C2.85010228,26.2046086 3.70028209,25.3282455 4.62690058,24.5365283 C22.814386,8.28422642 44.2433918,0.417962265 67.8405848,0.0133962275 Z"/>
      </g>
      <g id="ota_updates-animejs-wifi-2" fill="#FFF67F" transform="translate(20 30)">
        <path d="M49.7128655,0.503207547 C67.8492398,0.867584906 82.8490058,7.70769811 96.1890058,18.6497358 C97.8622222,20.0215094 99.048538,21.8835849 99.8421053,23.9144528 C100.850877,26.4918868 101.017661,29.0853962 99.0700585,31.3198868 C97.0740351,33.605283 94.402807,33.9857358 91.5836257,33.3561132 C88.5546199,32.6809434 86.2223392,30.8161887 83.9546199,28.8013962 C65.8693567,12.6776981 39.0467836,11.5631321 19.9312281,26.1221509 C18.2176608,27.4269434 16.6466667,28.9166038 15.0218713,30.3339245 C12.5281871,32.5067925 9.7251462,33.8624906 6.31684211,33.5918868 C1.87824561,33.2409057 -0.698830409,29.508717 0.519766082,25.2647925 C1.15769696,23.0942633 2.39339618,21.14514 4.08678363,19.6383774 C17.1470175,7.6889434 32.3189474,0.757735849 49.7128655,0.503207547 Z"/>
      </g>
      <g id="ota_updates-animejs-wifi-1" fill="#FFF9AC" transform="translate(38 62)">
        <path d="M35.0969591,0.271018868 C44.488837,0.440510178 53.419411,4.35744937 59.885848,11.1433962 C62.1697076,13.5198868 63.7460819,16.1991321 62.8449123,19.7169811 C61.7043275,24.1993585 56.2919298,26.2998868 52.5231579,22.8222264 C40.7945029,11.9980755 24.4792982,11.9176981 12.0431579,22.2033208 C8.57298246,25.0727925 6.34561404,25.308566 3.57216374,23.0955094 C0.79871345,20.8824528 0.12619883,17.1368679 1.97157895,13.7181509 C2.96690058,11.8748302 4.42222222,10.4226792 6.03625731,9.10984906 C13.1595322,3.33339623 22.3460819,0.252264151 35.0969591,0.271018868 Z"/>
      </g>
    </g>
  </g>
</svg>
<script src="anime.min.js"></script>
<script src="isScrolledIntoView.js"></script>
<script>
(function() {
  const svg = document.querySelector('#ota_updates')
  const wrapper = document.createElement('div')
  wrapper.classList = 'relative'
  const restart = document.createElement('div')
  restart.classList = 'restart'
  restart.innerHTML = '<span>Restart</span>'
  wrap(svg, wrapper)
  wrapper.appendChild(restart)
  const basicTimeline = anime.timeline({
    autoplay: false,
  });
  basicTimeline
  .add({
    begin: function() {
      wrapper.onclick = function() {}
      restart.classList.add('inactive')
    }
  })
  .add({
    targets: '#ota_updates-animejs-wifi-1',
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: '#ota_updates-animejs-wifi-2',
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: '#ota_updates-animejs-wifi-3',
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: ['#ota_updates-animejs-app1', '#ota_updates-animejs-app2', '#ota_updates-animejs-app3'],
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: ['#ota_updates-animejs-wifi-1', '#ota_updates-animejs-wifi-2', '#ota_updates-animejs-wifi-3'],
    opacity: [1, 0],
    easing: 'easeOutExpo',
  })
  .add({
    complete: function() {
      wrapper.onclick = basicTimeline.restart
      restart.classList.remove('inactive')
    }
  })
  wrapper.onclick = basicTimeline.restart
  onScrollIntoView(svg, function() {
    setTimeout(basicTimeline.play, 1000)
  });
  function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }
})();
</script>
```

Ideally, you should design a mechanism to package software that has almost zero overhead without sacrificing portability.

**Something small and efficient.**

Something that will last for years to come and transmit data securely to prevent malicious actors from damaging your infrastructure.

**Communication should be encrypted everywhere.**

_But how?_

Designing a secure cluster is no small feat, particularly at a solar installation that can span a wide area, making it hard to protect the perimeter from trespassers who could gain physical access to your devices to extract secrets.

_How do you protect against that?_

Even if you have security sorted and rolled out a strategy to take care of software and firmware updates, you have still a long way to go.

You still have to create a service to aggregate and process the data, design a dashboard for visualisations, set up alerts and monitoring and a control plane to drive coordinated changes.

What initially seems like a fun weekend project becomes a major effort in distributed systems engineering.

Companies exist that specialise in designing and installing software for solar plants. Should you surrender and buy prepackaged software?

**Never.**

So how can you compete with an established business with years of experience?

**By playing smart.**

## Scaling clusters with cloud infrastructure

Building an internet of things at scale, such as at the scale of a solar plant, shares plenty of commonalities with building cloud infrastructure.

Elastic Container Service (ECS), a product from Amazon Web Services, can deploy applications across several servers.

It's designed so that you install an agent on the worker computer, which communicates with a master node that is in charge of scheduling workloads.

You tell ECS what to deploy and the software on the master node instructs one of the agents to download and run it.

```include
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 780" id="ecs">
  <g fill="none" fill-rule="evenodd">
    <g id="ecs-animejs-ecs" transform="translate(324 73)">
      <g fill-rule="nonzero" transform="translate(22 47)">
        <g>
          <polygon fill="#9D5025" points="5.835 7.188 0 10.072 0 91.927 5.835 94.812 28.821 52.705"/>
          <polygon fill="#9D5025" points="23.595 21.962 32.187 9.865 70.69 26.887 61.713 28.305"/>
          <polygon fill="#9D5025" points="16.927 80.915 26.384 93.84 70.69 74.827 62.13 73.504"/>
          <polygon fill="#F58536" points="19.428 91.641 5.835 94.812 5.835 7.188 19.428 10.264"/>
          <polygon fill="#9D5025" points="12.279 3.984 19.428 .43 32.892 56.674 19.428 101.57 12.279 98.016"/>
          <polygon fill="#9D5025" points="61.649 73.44 70.69 74.827 78.961 51.924 70.69 26.887 61.649 28.305"/>
          <polygon fill="#F58536" points="33.341 97.665 19.428 101.57 19.428 .43 33.341 4.351"/>
          <polygon fill="#F58536" points="80.163 73.058 19.428 84.278 19.428 101.57 80.163 84.517"/>
          <polygon fill="#F58536" points="80.275 28.688 19.428 17.197 19.428 .43 80.275 17.595"/>
          <polygon fill="#F58536" points="70.69 14.886 80.452 17.563 80.452 84.517 70.69 87.178"/>
          <polygon fill="#6B3A19" points="109 42.155 82.872 43.382 73.639 42.76 100.056 21.595"/>
          <polygon fill="#9D5025" points="73.639 42.76 100.056 41.278 100.056 21.595 73.639 25.851"/>
          <polygon fill="#6B3A19" points="48.778 41.103 75.547 14.28 89.156 40.194 61.409 41.947"/>
          <polygon fill="#9D5025" points="48.778 41.103 75.547 38.84 75.547 14.28 48.778 20.512"/>
          <polygon fill="#9D5025" points="73.639 59.59 109 60.196 100.056 80.755 73.639 76.5"/>
          <polygon fill="#9D5025" points="48.778 61.248 89.156 62.172 75.547 88.071 48.778 81.855"/>
          <polygon fill="#FBBF93" points="48.778 61.248 75.547 63.527 89.156 62.172 61.409 60.403"/>
          <polygon fill="#FBBF93" points="109 60.196 82.872 58.985 73.639 59.59 100.056 61.088"/>
          <polygon fill="#F58536" points="100.056 41.278 109 42.155 109 24.257 100.056 21.595"/>
          <polygon fill="#F58536" points="89.156 40.194 75.547 38.84 75.547 14.28 89.156 18.344"/>
          <polygon fill="#F58536" points="100.056 61.088 109 60.196 109 78.094 100.056 80.755"/>
          <polygon fill="#F58536" points="89.156 62.172 75.547 63.527 75.547 88.071 89.156 84.022"/>
        </g>
      </g>
      <text fill="#4A4A4A" font-size="26" font-weight="bold" letter-spacing=".13" class="sans-serif">
        <tspan x=".346" y="27">Amazon ECS</tspan>
      </text>
    </g>
    <g fill-rule="nonzero" transform="rotate(180 234.5 161)">
      <g id="ecs-animejs-wifi-3" fill="#F8E71C">
        <path d="M67.8405848,0.0133962275 C94.1681871,0.36973585 116.175556,9.29698113 134.419532,27.2559623 C138.199064,30.977434 139.062573,35.4490943 136.644211,38.5329057 C134.177427,41.6783396 129.27614,42.0293208 124.853684,39.2723774 C123.590129,38.4622036 122.411362,37.5278275 121.335088,36.483283 C92.2690058,8.88169811 47.6893567,7.98415094 17.4019883,34.4416981 C14.4698246,37.0030566 11.2659649,38.7526038 7.2497076,38.4793208 C4.44128655,38.2890943 2.18163743,37.0887925 0.917309942,34.484566 C-0.379298246,31.8053208 0.395438596,29.3645283 2.08748538,27.1541509 C2.85010228,26.2046086 3.70028209,25.3282455 4.62690058,24.5365283 C22.814386,8.28422642 44.2433918,0.417962265 67.8405848,0.0133962275 Z"/>
      </g>
      <g id="ecs-animejs-wifi-2" fill="#FFF67F" transform="translate(20 30)">
        <path d="M49.7128655,0.503207547 C67.8492398,0.867584906 82.8490058,7.70769811 96.1890058,18.6497358 C97.8622222,20.0215094 99.048538,21.8835849 99.8421053,23.9144528 C100.850877,26.4918868 101.017661,29.0853962 99.0700585,31.3198868 C97.0740351,33.605283 94.402807,33.9857358 91.5836257,33.3561132 C88.5546199,32.6809434 86.2223392,30.8161887 83.9546199,28.8013962 C65.8693567,12.6776981 39.0467836,11.5631321 19.9312281,26.1221509 C18.2176608,27.4269434 16.6466667,28.9166038 15.0218713,30.3339245 C12.5281871,32.5067925 9.7251462,33.8624906 6.31684211,33.5918868 C1.87824561,33.2409057 -0.698830409,29.508717 0.519766082,25.2647925 C1.15769696,23.0942633 2.39339618,21.14514 4.08678363,19.6383774 C17.1470175,7.6889434 32.3189474,0.757735849 49.7128655,0.503207547 Z"/>
      </g>
      <g id="ecs-animejs-wifi-1" fill="#FFF9AC" transform="translate(38 62)">
        <path d="M35.0969591,0.271018868 C44.488837,0.440510178 53.419411,4.35744937 59.885848,11.1433962 C62.1697076,13.5198868 63.7460819,16.1991321 62.8449123,19.7169811 C61.7043275,24.1993585 56.2919298,26.2998868 52.5231579,22.8222264 C40.7945029,11.9980755 24.4792982,11.9176981 12.0431579,22.2033208 C8.57298246,25.0727925 6.34561404,25.308566 3.57216374,23.0955094 C0.79871345,20.8824528 0.12619883,17.1368679 1.97157895,13.7181509 C2.96690058,11.8748302 4.42222222,10.4226792 6.03625731,9.10984906 C13.1595322,3.33339623 22.3460819,0.252264151 35.0969591,0.271018868 Z"/>
      </g>
    </g>
    <g transform="translate(531 344)">
      <g>
        <path fill="#7C7C7C" d="M198,260.436888 L198,282.003361 C198,283.194445 196.969214,284.160008 195.697675,284.160008 L2.30232544,284.160008 C1.03078621,284.160008 1.55718645e-16,283.194445 0,282.003361 L0,260.436888 C-1.55718645e-16,259.245805 1.03078621,258.280241 2.30232544,258.280241 L195.697675,258.280241 C196.969214,258.280241 198,259.245805 198,260.436888 Z"/>
        <g transform="translate(5.986 265.052)">
          <polygon fill="#D8D8D8" points="22.141 0 153.141 0 153.141 3.081 22.141 3.081"/>
          <polygon fill="#D7D7D7" points="5.53 0 8.602 0 8.602 3.072 5.53 3.072"/>
          <polygon fill="#D7D7D7" points="0 0 3.072 0 3.072 3.072 0 3.072"/>
          <polygon fill="#00CD00" points="176.947 0 180.019 0 180.019 3.072 176.947 3.072"/>
          <polygon fill="#D7D400" points="171.418 0 174.49 0 174.49 3.072 171.418 3.072"/>
          <polygon fill="#FF3C00" points="165.888 0 168.96 0 168.96 3.072 165.888 3.072"/>
          <polygon fill="#00CD00" points="182.477 0 185.549 0 185.549 3.072 182.477 3.072"/>
        </g>
        <g transform="translate(5.986 270.444)">
          <polygon fill="#D8D8D8" points="22.141 0 153.141 0 153.141 3.081 22.141 3.081"/>
          <polygon fill="#D7D7D7" points="5.53 0 8.602 0 8.602 3.072 5.53 3.072"/>
          <polygon fill="#D7D7D7" points="0 0 3.072 0 3.072 3.072 0 3.072"/>
          <polygon fill="#00CD00" points="176.947 0 180.019 0 180.019 3.072 176.947 3.072"/>
          <polygon fill="#D7D400" points="171.418 0 174.49 0 174.49 3.072 171.418 3.072"/>
          <polygon fill="#FF3C00" points="165.888 0 168.96 0 168.96 3.072 165.888 3.072"/>
          <polygon fill="#00CD00" points="182.477 0 185.549 0 185.549 3.072 182.477 3.072"/>
        </g>
        <g transform="translate(5.986 275.836)">
          <polygon fill="#D8D8D8" points="22.141 0 153.141 0 153.141 3.081 22.141 3.081"/>
          <polygon fill="#D7D7D7" points="5.53 0 8.602 0 8.602 3.072 5.53 3.072"/>
          <polygon fill="#D7D7D7" points="0 0 3.072 0 3.072 3.072 0 3.072"/>
          <polygon fill="#00CD00" points="176.947 0 180.019 0 180.019 3.072 176.947 3.072"/>
          <polygon fill="#D7D400" points="171.418 0 174.49 0 174.49 3.072 171.418 3.072"/>
          <polygon fill="#FF3C00" points="165.888 0 168.96 0 168.96 3.072 165.888 3.072"/>
          <polygon fill="#00CD00" points="182.477 0 185.549 0 185.549 3.072 182.477 3.072"/>
        </g>
        <path fill="#7C7C7C" d="M198,2.30399993 L198,252.979192 C198,254.251656 196.969214,255.283192 195.697675,255.283192 L2.30232544,255.283192 C1.03078621,255.283192 1.55718645e-16,254.251656 0,252.979192 L0,2.30399993 C-1.55718645e-16,1.03153591 1.03078621,2.33747849e-16 2.30232544,0 L195.697675,0 C196.969214,1.21981781e-14 198,1.03153591 198,2.30399993 Z"/>
        <polygon fill="#D7D7D7" points="6.758 246.067 191.846 246.067 191.846 249.139 6.758 249.139"/>
        <polygon fill="#D7D7D7" points="5.99 16.589 191.846 16.589 191.846 19.661 5.99 19.661"/>
        <polygon fill="#D7D7D7" points="5.99 11.059 191.846 11.059 191.846 14.131 5.99 14.131"/>
        <polygon fill="#D7D7D7" points="5.99 5.53 191.846 5.53 191.846 8.602 5.99 8.602"/>
        <path fill="#FFF" d="M6.90697669,25.8810795 L191.093023,25.8810795 C191.601639,25.8810795 192.013953,26.2949136 192.013953,26.8054038 L192.013953,239.399986 C192.013953,239.910476 191.601639,240.32431 191.093023,240.32431 L6.90697669,240.32431 C6.398361,240.32431 5.98604651,239.910476 5.98604651,239.399986 L5.98604651,26.8054038 C5.98604651,26.2949136 6.398361,25.8810795 6.90697669,25.8810795 Z"/>
      </g>
    </g>
    <g transform="translate(301 344)">
      <g>
        <path fill="#7C7C7C" d="M198,260.436888 L198,282.003361 C198,283.194445 196.969214,284.160008 195.697675,284.160008 L2.30232544,284.160008 C1.03078621,284.160008 1.55718645e-16,283.194445 0,282.003361 L0,260.436888 C-1.55718645e-16,259.245805 1.03078621,258.280241 2.30232544,258.280241 L195.697675,258.280241 C196.969214,258.280241 198,259.245805 198,260.436888 Z"/>
        <g transform="translate(5.986 265.052)">
          <polygon fill="#D8D8D8" points="22.141 0 153.141 0 153.141 3.081 22.141 3.081"/>
          <polygon fill="#D7D7D7" points="5.53 0 8.602 0 8.602 3.072 5.53 3.072"/>
          <polygon fill="#D7D7D7" points="0 0 3.072 0 3.072 3.072 0 3.072"/>
          <polygon fill="#00CD00" points="176.947 0 180.019 0 180.019 3.072 176.947 3.072"/>
          <polygon fill="#D7D400" points="171.418 0 174.49 0 174.49 3.072 171.418 3.072"/>
          <polygon fill="#FF3C00" points="165.888 0 168.96 0 168.96 3.072 165.888 3.072"/>
          <polygon fill="#00CD00" points="182.477 0 185.549 0 185.549 3.072 182.477 3.072"/>
        </g>
        <g transform="translate(5.986 270.444)">
          <polygon fill="#D8D8D8" points="22.141 0 153.141 0 153.141 3.081 22.141 3.081"/>
          <polygon fill="#D7D7D7" points="5.53 0 8.602 0 8.602 3.072 5.53 3.072"/>
          <polygon fill="#D7D7D7" points="0 0 3.072 0 3.072 3.072 0 3.072"/>
          <polygon fill="#00CD00" points="176.947 0 180.019 0 180.019 3.072 176.947 3.072"/>
          <polygon fill="#D7D400" points="171.418 0 174.49 0 174.49 3.072 171.418 3.072"/>
          <polygon fill="#FF3C00" points="165.888 0 168.96 0 168.96 3.072 165.888 3.072"/>
          <polygon fill="#00CD00" points="182.477 0 185.549 0 185.549 3.072 182.477 3.072"/>
        </g>
        <g transform="translate(5.986 275.836)">
          <polygon fill="#D8D8D8" points="22.141 0 153.141 0 153.141 3.081 22.141 3.081"/>
          <polygon fill="#D7D7D7" points="5.53 0 8.602 0 8.602 3.072 5.53 3.072"/>
          <polygon fill="#D7D7D7" points="0 0 3.072 0 3.072 3.072 0 3.072"/>
          <polygon fill="#00CD00" points="176.947 0 180.019 0 180.019 3.072 176.947 3.072"/>
          <polygon fill="#D7D400" points="171.418 0 174.49 0 174.49 3.072 171.418 3.072"/>
          <polygon fill="#FF3C00" points="165.888 0 168.96 0 168.96 3.072 165.888 3.072"/>
          <polygon fill="#00CD00" points="182.477 0 185.549 0 185.549 3.072 182.477 3.072"/>
        </g>
        <path fill="#7C7C7C" d="M198,2.30399993 L198,252.979192 C198,254.251656 196.969214,255.283192 195.697675,255.283192 L2.30232544,255.283192 C1.03078621,255.283192 1.55718645e-16,254.251656 0,252.979192 L0,2.30399993 C-1.55718645e-16,1.03153591 1.03078621,2.33747849e-16 2.30232544,0 L195.697675,0 C196.969214,1.21981781e-14 198,1.03153591 198,2.30399993 Z"/>
        <polygon fill="#D7D7D7" points="6.758 246.067 191.846 246.067 191.846 249.139 6.758 249.139"/>
        <polygon fill="#D7D7D7" points="5.99 16.589 191.846 16.589 191.846 19.661 5.99 19.661"/>
        <polygon fill="#D7D7D7" points="5.99 11.059 191.846 11.059 191.846 14.131 5.99 14.131"/>
        <polygon fill="#D7D7D7" points="5.99 5.53 191.846 5.53 191.846 8.602 5.99 8.602"/>
        <path fill="#FFF" d="M6.90697669,25.8810795 L191.093023,25.8810795 C191.601639,25.8810795 192.013953,26.2949136 192.013953,26.8054038 L192.013953,239.399986 C192.013953,239.910476 191.601639,240.32431 191.093023,240.32431 L6.90697669,240.32431 C6.398361,240.32431 5.98604651,239.910476 5.98604651,239.399986 L5.98604651,26.8054038 C5.98604651,26.2949136 6.398361,25.8810795 6.90697669,25.8810795 Z"/>
      </g>
    </g>
    <g transform="translate(70 344)">
      <g>
        <path fill="#7C7C7C" d="M198,260.436888 L198,282.003361 C198,283.194445 196.969214,284.160008 195.697675,284.160008 L2.30232544,284.160008 C1.03078621,284.160008 1.55718645e-16,283.194445 0,282.003361 L0,260.436888 C-1.55718645e-16,259.245805 1.03078621,258.280241 2.30232544,258.280241 L195.697675,258.280241 C196.969214,258.280241 198,259.245805 198,260.436888 Z"/>
        <g transform="translate(5.986 265.052)">
          <polygon fill="#D8D8D8" points="22.141 0 153.141 0 153.141 3.081 22.141 3.081"/>
          <polygon fill="#D7D7D7" points="5.53 0 8.602 0 8.602 3.072 5.53 3.072"/>
          <polygon fill="#D7D7D7" points="0 0 3.072 0 3.072 3.072 0 3.072"/>
          <polygon fill="#00CD00" points="176.947 0 180.019 0 180.019 3.072 176.947 3.072"/>
          <polygon fill="#D7D400" points="171.418 0 174.49 0 174.49 3.072 171.418 3.072"/>
          <polygon fill="#FF3C00" points="165.888 0 168.96 0 168.96 3.072 165.888 3.072"/>
          <polygon fill="#00CD00" points="182.477 0 185.549 0 185.549 3.072 182.477 3.072"/>
        </g>
        <g transform="translate(5.986 270.444)">
          <polygon fill="#D8D8D8" points="22.141 0 153.141 0 153.141 3.081 22.141 3.081"/>
          <polygon fill="#D7D7D7" points="5.53 0 8.602 0 8.602 3.072 5.53 3.072"/>
          <polygon fill="#D7D7D7" points="0 0 3.072 0 3.072 3.072 0 3.072"/>
          <polygon fill="#00CD00" points="176.947 0 180.019 0 180.019 3.072 176.947 3.072"/>
          <polygon fill="#D7D400" points="171.418 0 174.49 0 174.49 3.072 171.418 3.072"/>
          <polygon fill="#FF3C00" points="165.888 0 168.96 0 168.96 3.072 165.888 3.072"/>
          <polygon fill="#00CD00" points="182.477 0 185.549 0 185.549 3.072 182.477 3.072"/>
        </g>
        <g transform="translate(5.986 275.836)">
          <polygon fill="#D8D8D8" points="22.141 0 153.141 0 153.141 3.081 22.141 3.081"/>
          <polygon fill="#D7D7D7" points="5.53 0 8.602 0 8.602 3.072 5.53 3.072"/>
          <polygon fill="#D7D7D7" points="0 0 3.072 0 3.072 3.072 0 3.072"/>
          <polygon fill="#00CD00" points="176.947 0 180.019 0 180.019 3.072 176.947 3.072"/>
          <polygon fill="#D7D400" points="171.418 0 174.49 0 174.49 3.072 171.418 3.072"/>
          <polygon fill="#FF3C00" points="165.888 0 168.96 0 168.96 3.072 165.888 3.072"/>
          <polygon fill="#00CD00" points="182.477 0 185.549 0 185.549 3.072 182.477 3.072"/>
        </g>
        <path fill="#7C7C7C" d="M198,2.30399993 L198,252.979192 C198,254.251656 196.969214,255.283192 195.697675,255.283192 L2.30232544,255.283192 C1.03078621,255.283192 1.55718645e-16,254.251656 0,252.979192 L0,2.30399993 C-1.55718645e-16,1.03153591 1.03078621,2.33747849e-16 2.30232544,0 L195.697675,0 C196.969214,1.21981781e-14 198,1.03153591 198,2.30399993 Z"/>
        <polygon fill="#D7D7D7" points="6.758 246.067 191.846 246.067 191.846 249.139 6.758 249.139"/>
        <polygon fill="#D7D7D7" points="5.99 16.589 191.846 16.589 191.846 19.661 5.99 19.661"/>
        <polygon fill="#D7D7D7" points="5.99 11.059 191.846 11.059 191.846 14.131 5.99 14.131"/>
        <polygon fill="#D7D7D7" points="5.99 5.53 191.846 5.53 191.846 8.602 5.99 8.602"/>
        <path fill="#FFF" d="M6.90697669,25.8810795 L191.093023,25.8810795 C191.601639,25.8810795 192.013953,26.2949136 192.013953,26.8054038 L192.013953,239.399986 C192.013953,239.910476 191.601639,240.32431 191.093023,240.32431 L6.90697669,240.32431 C6.398361,240.32431 5.98604651,239.910476 5.98604651,239.399986 L5.98604651,26.8054038 C5.98604651,26.2949136 6.398361,25.8810795 6.90697669,25.8810795 Z"/>
      </g>
    </g>
    <g id="ecs-animejs-ecs1" fill-rule="nonzero" transform="translate(85.968 376.022)">
      <polygon fill="#F58536" points="3.156 0 3.156 39.817 26.588 33.043 26.588 6.519"/>
      <polygon fill="#9D5025" points="3.21 0 3.21 39.819 .442 38.423 .442 1.425"/>
    </g>
    <g id="ecs-animejs-ecs2" fill-rule="nonzero" transform="translate(316.968 376.022)">
      <polygon fill="#F58536" points="3.156 0 3.156 39.817 26.588 33.043 26.588 6.519"/>
      <polygon fill="#9D5025" points="3.21 0 3.21 39.819 .442 38.423 .442 1.425"/>
    </g>
    <g id="ecs-animejs-ecs3" fill-rule="nonzero" transform="translate(546.968 376.022)">
      <polygon fill="#F58536" points="3.156 0 3.156 39.817 26.588 33.043 26.588 6.519"/>
      <polygon fill="#9D5025" points="3.21 0 3.21 39.819 .442 38.423 .442 1.425"/>
    </g>
    <g id="ecs-animejs-app1" transform="translate(90 427)">
      <g transform="translate(.758 .258)">
        <path fill="#00C176" d="M158.400002,134.890599 C158.400002,135.741965 157.904038,136.432001 157.291993,136.432001 L1.108009,136.432001 C0.49596405,136.432001 0,135.741965 0,134.890599 L-4.4408921e-16,3.96000004 C-7.11925298e-16,1.77295241 1.77295241,-1.29209222e-14 3.96000004,-1.33226763e-14 L154.440002,-4.4408921e-16 C156.627049,-8.45843342e-16 158.400002,1.77295241 158.400002,3.96000004 L158.400002,134.890599 Z"/>
        <text fill="#FFF" font-size="26.928" font-weight="bold" class="sans-serif">
          <tspan x="51.516" y="86.234">APP</tspan>
        </text>
        <path fill="#CCC" d="M3.96000004,0 L154.440002,0 C156.627049,-4.01754132e-16 158.400002,1.77295241 158.400002,3.96000004 L158.400002,18.2160002 L0,18.2160002 L0,3.96000004 C-2.67836088e-16,1.77295241 1.77295241,-4.23350776e-17 3.96000004,-4.4408921e-16 Z"/>
        <path fill="#E74C3C" d="M13.4640001,9.9000001 C13.4640001,11.8685633 11.8685633,13.4640001 9.9000001,13.4640001 C7.9314369,13.4640001 6.33600006,11.8685633 6.33600006,9.9000001 C6.33600006,7.9314369 7.9314369,6.33600006 9.9000001,6.33600006 C11.8685633,6.33600006 13.4640001,7.9314369 13.4640001,9.9000001"/>
        <path fill="#F1C40F" d="M26.1360003,9.9000001 C26.1360003,11.8685633 24.5405634,13.4640001 22.5720002,13.4640001 C20.603437,13.4640001 19.0080002,11.8685633 19.0080002,9.9000001 C19.0080002,7.9314369 20.603437,6.33600006 22.5720002,6.33600006 C24.5405634,6.33600006 26.1360003,7.9314369 26.1360003,9.9000001"/>
        <path fill="#2ECC71" d="M38.0160004,9.9000001 C38.0160004,11.8685633 36.4205635,13.4640001 34.4520003,13.4640001 C32.4834372,13.4640001 30.8880003,11.8685633 30.8880003,9.9000001 C30.8880003,7.9314369 32.4834372,6.33600006 34.4520003,6.33600006 C36.4205635,6.33600006 38.0160004,7.9314369 38.0160004,9.9000001"/>
      </g>
    </g>
    <g id="ecs-animejs-app2" transform="translate(321 427)">
      <g transform="translate(.758 .258)">
        <path fill="#00C176" d="M158.400002,134.890599 C158.400002,135.741965 157.904038,136.432001 157.291993,136.432001 L1.108009,136.432001 C0.49596405,136.432001 0,135.741965 0,134.890599 L-4.4408921e-16,3.96000004 C-7.11925298e-16,1.77295241 1.77295241,-1.29209222e-14 3.96000004,-1.33226763e-14 L154.440002,-4.4408921e-16 C156.627049,-8.45843342e-16 158.400002,1.77295241 158.400002,3.96000004 L158.400002,134.890599 Z"/>
        <text fill="#FFF" font-size="26.928" font-weight="bold" class="sans-serif">
          <tspan x="51.516" y="86.234">APP</tspan>
        </text>
        <path fill="#CCC" d="M3.96000004,0 L154.440002,0 C156.627049,-4.01754132e-16 158.400002,1.77295241 158.400002,3.96000004 L158.400002,18.2160002 L0,18.2160002 L0,3.96000004 C-2.67836088e-16,1.77295241 1.77295241,-4.23350776e-17 3.96000004,-4.4408921e-16 Z"/>
        <path fill="#E74C3C" d="M13.4640001,9.9000001 C13.4640001,11.8685633 11.8685633,13.4640001 9.9000001,13.4640001 C7.9314369,13.4640001 6.33600006,11.8685633 6.33600006,9.9000001 C6.33600006,7.9314369 7.9314369,6.33600006 9.9000001,6.33600006 C11.8685633,6.33600006 13.4640001,7.9314369 13.4640001,9.9000001"/>
        <path fill="#F1C40F" d="M26.1360003,9.9000001 C26.1360003,11.8685633 24.5405634,13.4640001 22.5720002,13.4640001 C20.603437,13.4640001 19.0080002,11.8685633 19.0080002,9.9000001 C19.0080002,7.9314369 20.603437,6.33600006 22.5720002,6.33600006 C24.5405634,6.33600006 26.1360003,7.9314369 26.1360003,9.9000001"/>
        <path fill="#2ECC71" d="M38.0160004,9.9000001 C38.0160004,11.8685633 36.4205635,13.4640001 34.4520003,13.4640001 C32.4834372,13.4640001 30.8880003,11.8685633 30.8880003,9.9000001 C30.8880003,7.9314369 32.4834372,6.33600006 34.4520003,6.33600006 C36.4205635,6.33600006 38.0160004,7.9314369 38.0160004,9.9000001"/>
      </g>
    </g>
    <g id="ecs-animejs-app3" transform="translate(551 427)">
      <g transform="translate(.758 .258)">
        <path fill="#00C176" d="M158.400002,134.890599 C158.400002,135.741965 157.904038,136.432001 157.291993,136.432001 L1.108009,136.432001 C0.49596405,136.432001 0,135.741965 0,134.890599 L-4.4408921e-16,3.96000004 C-7.11925298e-16,1.77295241 1.77295241,-1.29209222e-14 3.96000004,-1.33226763e-14 L154.440002,-4.4408921e-16 C156.627049,-8.45843342e-16 158.400002,1.77295241 158.400002,3.96000004 L158.400002,134.890599 Z"/>
        <text fill="#FFF" font-size="26.928" font-weight="bold" class="sans-serif">
          <tspan x="51.516" y="86.234">APP</tspan>
        </text>
        <path fill="#CCC" d="M3.96000004,0 L154.440002,0 C156.627049,-4.01754132e-16 158.400002,1.77295241 158.400002,3.96000004 L158.400002,18.2160002 L0,18.2160002 L0,3.96000004 C-2.67836088e-16,1.77295241 1.77295241,-4.23350776e-17 3.96000004,-4.4408921e-16 Z"/>
        <path fill="#E74C3C" d="M13.4640001,9.9000001 C13.4640001,11.8685633 11.8685633,13.4640001 9.9000001,13.4640001 C7.9314369,13.4640001 6.33600006,11.8685633 6.33600006,9.9000001 C6.33600006,7.9314369 7.9314369,6.33600006 9.9000001,6.33600006 C11.8685633,6.33600006 13.4640001,7.9314369 13.4640001,9.9000001"/>
        <path fill="#F1C40F" d="M26.1360003,9.9000001 C26.1360003,11.8685633 24.5405634,13.4640001 22.5720002,13.4640001 C20.603437,13.4640001 19.0080002,11.8685633 19.0080002,9.9000001 C19.0080002,7.9314369 20.603437,6.33600006 22.5720002,6.33600006 C24.5405634,6.33600006 26.1360003,7.9314369 26.1360003,9.9000001"/>
        <path fill="#2ECC71" d="M38.0160004,9.9000001 C38.0160004,11.8685633 36.4205635,13.4640001 34.4520003,13.4640001 C32.4834372,13.4640001 30.8880003,11.8685633 30.8880003,9.9000001 C30.8880003,7.9314369 32.4834372,6.33600006 34.4520003,6.33600006 C36.4205635,6.33600006 38.0160004,7.9314369 38.0160004,9.9000001"/>
      </g>
    </g>
  </g>
</svg>
<script src="anime.min.js"></script>
<script src="isScrolledIntoView.js"></script>
<script>
(function() {
  const svg = document.querySelector('#ecs')
  const wrapper = document.createElement('div')
  wrapper.classList = 'relative'
  const restart = document.createElement('div')
  restart.classList = 'restart'
  restart.innerHTML = '<span>Restart</span>'
  wrap(svg, wrapper)
  wrapper.appendChild(restart)
  const basicTimeline = anime.timeline({
    autoplay: false,
  });
  basicTimeline
  .add({
    begin: function() {
      wrapper.onclick = function() {}
      restart.classList.add('inactive')
    }
  })
  .add({
    targets: ['#ecs-animejs-ecs', '#ecs-animejs-ecs1', '#ecs-animejs-ecs2', '#ecs-animejs-ecs3'],
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: '#ecs-animejs-wifi-1',
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: '#ecs-animejs-wifi-2',
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: '#ecs-animejs-wifi-3',
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: ['#ecs-animejs-app1', '#ecs-animejs-app2', '#ecs-animejs-app3'],
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: ['#ecs-animejs-wifi-1', '#ecs-animejs-wifi-2', '#ecs-animejs-wifi-3'],
    opacity: [1, 0],
    easing: 'easeOutExpo',
  })
  .add({
    complete: function() {
      wrapper.onclick = basicTimeline.restart
      restart.classList.remove('inactive')
    }
  })
  wrapper.onclick = basicTimeline.restart
  onScrollIntoView(svg, function() {
    setTimeout(basicTimeline.play, 1000)
  });
  function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }
})();
</script>
```

That sounds a lot like what you want to do with your solar panels.

You want to have an agent installed on each embedded computer, and you want to manage applications from a central location.

But ECS is Amazon only, and you can't take advantage of it on your hardware.

What you need is an open source version of ECS.

**Enter Kubernetes.**

## Kubernetes — the container orchestrator

Kubernetes is similar to ECS: you install an agent called the kubelet on your devices, which communicates with a Kubernetes master, forming a cluster.

From that moment onwards your devices are acting as one, and you can schedule deployments and manage applications.

```include
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 780" id="k8s">
  <defs>
    <linearGradient id="linearGradient-1" x1="50%" x2="50%" y1="0%" y2="100%">
      <stop offset="0%" stop-color="#E8E8E8"/>
      <stop offset="100%" stop-color="#B7B3B3"/>
    </linearGradient>
    <linearGradient x1="50%" x2="50%" y1="0%" y2="100%">
      <stop offset="0%" stop-color="#BBB7B7"/>
      <stop offset="100%" stop-color="#888"/>
    </linearGradient>
  </defs>
  <g fill="none" fill-rule="evenodd">
    <g id="k8s-animejs-k8s" fill-rule="nonzero" transform="translate(338 99)">
      <path fill="#326CE5" d="M67.5137286,0.0117203812 C66.3117084,0.0727598226 65.1339837,0.373188117 64.0496461,0.895380572 L16.7797314,23.6633424 C14.3013695,24.8564681 12.5012533,27.1129595 11.8889064,29.7941159 L0.227099842,80.9367112 C-0.31695066,83.3173305 0.125730558,85.8167503 1.45434024,87.865826 C1.61379744,88.1137668 1.78529216,88.3537592 1.96820937,88.5849425 L34.6865593,129.59287 C36.4021247,131.742381 39.0032487,132.993978 41.7537713,132.993438 L94.2228324,132.981249 C96.9723262,132.983269 99.5732668,131.734004 101.290044,129.586775 L133.996303,88.5727541 C135.712787,86.4221651 136.355898,83.6069207 135.743458,80.9245228 L124.063515,29.7819275 C123.451168,27.1007711 121.651052,24.8442797 119.17269,23.651154 L71.89673,0.895380572 C70.5327966,0.238503883 69.0256905,-0.0653448868 67.5137286,0.0117203812 Z"/>
      <path fill="#FFF" d="M67.982118,17.4162174 C66.4195767,17.4163773 65.1526293,18.8351265 65.152815,20.5852057 C65.1528169,20.612065 65.1582705,20.6377309 65.1588509,20.6644304 C65.1565487,20.9022234 65.1451541,21.1887 65.152815,21.3957354 C65.1900786,22.4051312 65.4083518,23.1776799 65.5397282,24.107658 C65.777734,26.0981064 65.9771665,27.7480669 65.8540952,29.2816408 C65.7344056,29.8599373 65.3118596,30.388819 64.9351763,30.7564392 L64.8686756,31.9630924 C63.1707417,32.1049012 61.46145,32.3645769 59.7541664,32.7553395 C52.4077269,34.436791 46.0825719,38.2514513 41.2669686,43.4019212 C40.9544936,43.1870287 40.407822,42.791693 40.2452662,42.6706162 C39.7401181,42.7393823 39.2295784,42.8964998 38.5646119,42.5060726 C37.2984557,41.6469101 36.1452686,40.4609675 34.7498893,39.0323739 C34.110519,38.3490055 33.6475116,37.6982767 32.8878693,37.0395678 C32.7153602,36.8899779 32.4520928,36.6876541 32.2591353,36.5337485 C31.6652468,36.0564365 30.9647752,35.80751 30.2882961,35.7841609 C29.4185364,35.7541404 28.5812465,36.0969352 28.0333174,36.7897053 C27.0592227,38.021297 27.3710922,39.9037092 28.7285521,40.994709 C28.7423262,41.0057663 28.7569941,41.0143625 28.7708708,41.02518 C28.9574055,41.1776074 29.1858275,41.3729165 29.3572861,41.5005282 C30.1633947,42.1005006 30.8997544,42.4076292 31.7029476,42.8839135 C33.3951126,43.9373457 34.7979381,44.8108261 35.9106289,45.8639813 C36.3451364,46.3308796 36.4210797,47.1535977 36.4789078,47.5094175 L37.3857356,48.3260414 C32.5312476,55.6905128 30.2845508,64.7871238 31.6122745,74.0557885 L30.4273527,74.4031584 C30.1150557,74.8096879 29.6737599,75.4493613 29.2121937,75.6402826 C27.7564075,76.1025083 26.1180021,76.2722452 24.1400031,76.4812834 C23.2113513,76.5591235 22.4100792,76.512671 21.4255649,76.7006749 C21.208878,76.7420531 20.9069619,76.8213441 20.669875,76.8774069 C20.6616338,76.879162 20.6539342,76.8816192 20.645693,76.8834914 C20.6327701,76.8865141 20.6157923,76.8928326 20.6033743,76.8956798 C18.9357512,77.3018544 17.8644659,78.8469965 18.2093487,80.3693785 C18.5543128,81.8921173 20.1832136,82.8181327 21.8608423,82.4535977 C21.8729527,82.450809 21.8905379,82.4503409 21.903161,82.4475132 C21.9221004,82.4431449 21.9387744,82.4338817 21.9575706,82.4292403 C22.1914307,82.3774912 22.4845019,82.3199151 22.6890784,82.2646967 C23.6570077,82.0034492 24.3580171,81.619596 25.2281965,81.2835292 C27.1002646,80.6066782 28.6507787,80.0412429 30.1613402,79.8209192 C30.792237,79.7711086 31.4569404,80.2133199 31.7875848,80.399869 L33.0208708,80.1865717 C35.8589141,89.0563885 41.8065404,96.2255566 49.3377271,100.724053 L48.823858,101.967272 C49.0090772,102.450015 49.2133654,103.103174 49.0753941,103.579911 C48.5262327,105.015452 47.5855905,106.530672 46.5144696,108.219929 C45.9958415,109.000363 45.4650584,109.606018 44.9970443,110.499163 C44.8850523,110.712878 44.7424206,111.041172 44.6343132,111.267034 C43.9071407,112.835412 44.4405393,114.641801 45.8373715,115.319682 C47.2429789,116.00182 48.9877099,115.282368 49.7427769,113.710811 C49.7439376,113.708588 49.7477487,113.70695 49.7488127,113.704727 C49.7495866,113.702971 49.7480389,113.700339 49.7488127,113.698642 C49.8563611,113.475828 50.0087275,113.182951 50.0994528,112.973431 C50.5003201,112.047693 50.6337046,111.254365 50.9155979,110.359016 C51.6642015,108.463446 52.0755,106.474513 53.1060259,105.235179 C53.3882172,104.895809 53.8482822,104.765292 54.3252708,104.636555 L54.9660958,103.466467 C61.5316728,106.006884 68.8807839,106.688589 76.2221413,105.008301 C77.8968894,104.624986 79.5136973,104.128892 81.0766932,103.533503 C81.2567975,103.855536 81.5915064,104.474585 81.6812452,104.63046 C82.1659681,104.789432 82.6950429,104.871526 83.1261243,105.514121 C83.8971243,106.841971 84.4243922,108.41285 85.0667359,110.310262 C85.3486757,111.205596 85.4880109,111.998959 85.8889265,112.924678 C85.9803038,113.135674 86.131908,113.432664 86.2395666,113.655983 C86.9930453,115.232645 88.7433054,115.954556 90.1510176,115.270948 C91.5476776,114.592706 92.0816643,112.786481 91.3540759,111.218299 C91.2459549,110.992445 91.0973009,110.664138 90.9852992,110.450429 C90.5172387,109.557309 89.9865408,108.957693 89.4678739,108.17729 C88.396664,106.488088 87.5082203,105.084806 86.9589834,103.649293 C86.7293291,102.908906 86.9977289,102.448443 87.1766221,101.967291 C87.0694897,101.843502 86.8402378,101.144312 86.7050716,100.815486 C94.5318233,96.1569445 100.304793,88.7204251 103.015882,80.1317433 C103.38198,80.1897446 104.018286,80.3032314 104.224986,80.3450406 C104.650502,80.0621329 105.041748,79.6930052 105.808912,79.7539024 C107.319483,79.9741461 108.869953,80.5397589 110.742056,81.2165124 C111.612253,81.5525344 112.313233,81.9425773 113.281174,82.2037741 C113.485752,82.2589808 113.778818,82.3104862 114.012682,82.3622235 C114.031486,82.3668649 114.048142,82.3761476 114.067092,82.3804964 C114.079724,82.3833436 114.0973,82.3837922 114.10941,82.3865809 C115.787136,82.7506635 117.416327,81.8251902 117.760904,80.3023617 C118.1054,78.77989 117.03461,77.234389 115.366878,76.828663 C115.124297,76.7730585 114.780269,76.6786226 114.544688,76.6336483 C113.560164,76.4456971 112.758905,76.4920482 111.830249,76.4142568 C109.852241,76.205322 108.213868,76.0354038 106.758059,75.5732561 C106.164484,75.341134 105.742212,74.6291433 105.536854,74.3361318 L104.394251,74.0009504 C104.986666,69.6805136 104.826927,65.1840762 103.80179,60.6851054 C102.767109,56.1442456 100.938561,51.991188 98.4998699,48.3321454 C98.7929664,48.0635537 99.3464728,47.5694606 99.5034261,47.4241084 C99.5493063,46.9123567 99.5098876,46.3758012 100.035432,45.8091432 C101.148067,44.7559295 102.551004,43.8825972 104.243113,42.8290754 C105.046281,42.3527482 105.788743,42.0457054 106.59482,41.4456901 C106.777105,41.3100067 107.026016,41.0951337 107.217509,40.9398708 C108.57468,39.8485044 108.887151,37.9662054 107.912743,36.7348672 C106.938335,35.503529 105.050143,35.387544 103.692971,36.4789104 C103.499793,36.6331378 103.237665,36.8343285 103.064237,36.9847297 C102.30463,37.6434814 101.835507,38.2941342 101.196171,38.9775358 C99.8008676,40.4062035 98.6475605,41.598098 97.3814489,42.4573287 C96.832804,42.7793096 96.0291949,42.6679016 95.6645117,42.6462491 L94.5884093,43.4202136 C88.4521977,36.9339147 80.0976074,32.7869494 71.1016059,31.981375 C71.0764449,31.601346 71.0434819,30.9144166 71.0351052,30.7076855 C70.6668199,30.352437 70.2219258,30.0491483 70.1101408,29.2816408 C69.9870695,27.7480669 70.1925475,26.0981064 70.4305533,24.107658 C70.5619297,23.1776799 70.7802029,22.4051312 70.8174665,21.3957354 C70.8259399,21.1662752 70.8123399,20.8333111 70.8114307,20.5852057 C70.8112449,18.8351265 69.544669,17.4160575 67.9821277,17.4162174 L67.982118,17.4162174 Z M64.4394437,39.5381932 L63.5991166,54.4994744 L63.5386614,54.5299454 C63.4822997,55.8683993 62.3895368,56.9371576 61.0479075,56.9371576 C60.498334,56.9371576 59.9910656,56.7592477 59.5788463,56.4557152 L59.5546642,56.4679036 L47.3850341,47.7714685 C51.1252565,44.0640155 55.9092955,41.3242077 61.4227297,40.0622951 C62.4298629,39.8317819 63.4365472,39.6607404 64.4394437,39.5381932 Z M71.5308378,39.5381932 C77.9678106,40.3362556 83.9207686,43.274444 88.4824736,47.7775627 L76.3914352,56.4191499 L76.3491166,56.4008771 C75.2759257,57.191016 73.7638726,56.9949678 72.9273527,55.9377172 C72.5846791,55.5045975 72.4048806,54.9953303 72.383256,54.4812015 L72.3711649,54.475117 L71.5308378,39.5381932 Z M42.971805,53.3598574 L54.0834693,63.3787357 L54.0713783,63.4396778 C55.074329,64.318603 55.2222285,65.8438069 54.3857453,66.9011881 C54.0430949,67.3343254 53.5844325,67.6248368 53.0920042,67.7604714 L53.0799132,67.8092251 L38.8366699,71.9532867 C38.1117338,65.2710761 39.6740565,58.7754361 42.971805,53.3598574 Z M92.9138392,53.3659419 C94.5648173,56.0634939 95.815021,59.0763885 96.5592873,62.3427106 C97.2946275,65.5698678 97.4791715,68.7912546 97.1759302,71.9045233 L82.8601408,67.7482733 L82.8480497,67.6873312 C81.5661095,67.3341518 80.7782709,66.0196399 81.0767126,64.7011691 C81.198983,64.1610526 81.483401,63.7041294 81.8686756,63.3665376 L81.8626398,63.3360665 L92.9138489,53.3659419 L92.9138392,53.3659419 Z M65.7029573,64.1526904 L70.2552332,64.1526904 L73.0845362,67.7178022 L72.068889,72.1665742 L67.982118,74.1471919 L63.883256,72.16048 L62.8676087,67.711708 L65.7029573,64.1526904 Z M80.2968406,76.3532952 C80.4902914,76.343447 80.6828988,76.3610178 80.8711649,76.3959547 L80.895347,76.3654837 L95.6282773,78.8762974 C93.4721066,84.9828111 89.3461974,90.2729894 83.8334693,93.8132018 L78.1144082,79.887936 L78.1325351,79.8635592 C77.6071823,78.6330186 78.132922,77.189994 79.3416389,76.6031578 C79.6511018,76.4529165 79.9744142,76.3697233 80.2968309,76.3532952 L80.2968406,76.3532952 Z M55.5525305,76.4142373 C56.6768501,76.430131 57.6853162,77.2167714 57.9465561,78.3704782 C58.0688575,78.9105869 58.0093328,79.4457403 57.8075092,79.9184071 L57.8498278,79.9732549 L52.1912218,93.7583539 C46.9007328,90.3361196 42.6868396,85.2120255 40.432687,78.9250609 L55.0386614,76.4264355 L55.0628435,76.4569065 C55.2262195,76.4265993 55.3919132,76.4119752 55.5525305,76.4142471 L55.5525305,76.4142373 Z M67.8914352,82.4536074 C68.2830784,82.4390983 68.680477,82.5201035 69.0582204,82.70347 C69.5533746,82.9438314 69.9358808,83.3222885 70.1766415,83.7760506 L70.2310511,83.7760506 L77.4312645,96.8907867 C76.496813,97.2065603 75.5361461,97.4764313 74.5535974,97.7013164 C69.0469458,98.9616766 63.5577904,98.5797931 58.5873812,96.872504 L65.769458,83.7821448 L65.781549,83.7821448 C66.2125065,82.9700238 67.029822,82.4855177 67.8914352,82.4536074 Z"/>
    </g>
    <g fill-rule="nonzero" transform="rotate(180 238 167)">
      <g id="k8s-animejs-wifi-3" fill="#F8E71C">
        <path d="M67.8405848,0.0133962275 C94.1681871,0.36973585 116.175556,9.29698113 134.419532,27.2559623 C138.199064,30.977434 139.062573,35.4490943 136.644211,38.5329057 C134.177427,41.6783396 129.27614,42.0293208 124.853684,39.2723774 C123.590129,38.4622036 122.411362,37.5278275 121.335088,36.483283 C92.2690058,8.88169811 47.6893567,7.98415094 17.4019883,34.4416981 C14.4698246,37.0030566 11.2659649,38.7526038 7.2497076,38.4793208 C4.44128655,38.2890943 2.18163743,37.0887925 0.917309942,34.484566 C-0.379298246,31.8053208 0.395438596,29.3645283 2.08748538,27.1541509 C2.85010228,26.2046086 3.70028209,25.3282455 4.62690058,24.5365283 C22.814386,8.28422642 44.2433918,0.417962265 67.8405848,0.0133962275 Z"/>
      </g>
      <g id="k8s-animejs-wifi-2" fill="#FFF67F" transform="translate(20 30)">
        <path d="M49.7128655,0.503207547 C67.8492398,0.867584906 82.8490058,7.70769811 96.1890058,18.6497358 C97.8622222,20.0215094 99.048538,21.8835849 99.8421053,23.9144528 C100.850877,26.4918868 101.017661,29.0853962 99.0700585,31.3198868 C97.0740351,33.605283 94.402807,33.9857358 91.5836257,33.3561132 C88.5546199,32.6809434 86.2223392,30.8161887 83.9546199,28.8013962 C65.8693567,12.6776981 39.0467836,11.5631321 19.9312281,26.1221509 C18.2176608,27.4269434 16.6466667,28.9166038 15.0218713,30.3339245 C12.5281871,32.5067925 9.7251462,33.8624906 6.31684211,33.5918868 C1.87824561,33.2409057 -0.698830409,29.508717 0.519766082,25.2647925 C1.15769696,23.0942633 2.39339618,21.14514 4.08678363,19.6383774 C17.1470175,7.6889434 32.3189474,0.757735849 49.7128655,0.503207547 Z"/>
      </g>
      <g id="k8s-animejs-wifi-1" fill="#FFF9AC" transform="translate(38 62)">
        <path d="M35.0969591,0.271018868 C44.488837,0.440510178 53.419411,4.35744937 59.885848,11.1433962 C62.1697076,13.5198868 63.7460819,16.1991321 62.8449123,19.7169811 C61.7043275,24.1993585 56.2919298,26.2998868 52.5231579,22.8222264 C40.7945029,11.9980755 24.4792982,11.9176981 12.0431579,22.2033208 C8.57298246,25.0727925 6.34561404,25.308566 3.57216374,23.0955094 C0.79871345,20.8824528 0.12619883,17.1368679 1.97157895,13.7181509 C2.96690058,11.8748302 4.42222222,10.4226792 6.03625731,9.10984906 C13.1595322,3.33339623 22.3460819,0.252264151 35.0969591,0.271018868 Z"/>
      </g>
    </g>
    <g fill-rule="nonzero" transform="translate(552.76 356.2)">
      <rect width="182.84" height="282.4" x="1.2" y="1.2" fill="url(#linearGradient-1)" stroke="url(#linearGradient-2)" stroke-width="2.4"/>
      <rect width="32.001" height="31.971" x="143.721" y="244.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="110.186" y="244.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="76.651" y="244.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="43.116" y="244.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="9.581" y="244.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="143.721" y="211.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="110.186" y="211.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="76.651" y="211.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="43.116" y="211.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="9.581" y="211.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="143.721" y="177.6" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="110.186" y="177.6" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="76.651" y="177.6" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="43.116" y="177.6" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="9.581" y="177.6" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="143.721" y="144" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="110.186" y="144" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="76.651" y="144" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="43.116" y="144" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="9.581" y="144" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="143.721" y="110.4" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="110.186" y="110.4" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="76.651" y="110.4" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="43.116" y="110.4" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="9.581" y="110.4" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="143.721" y="76.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="110.186" y="76.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="76.651" y="76.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="43.116" y="76.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="9.581" y="76.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="143.721" y="43.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="110.186" y="43.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="76.651" y="43.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="43.116" y="43.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="9.581" y="43.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="143.721" y="8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="110.186" y="8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="76.651" y="8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="43.116" y="8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="9.581" y="8" fill="#1B4996" rx="7.022"/>
      <rect width="1" height="268.443" x="167.674" y="8" fill="#C3BFBF"/>
      <rect width="1" height="268.443" x="153.302" y="8" fill="#C3BFBF"/>
      <rect width="1" height="268.443" x="134.14" y="8" fill="#C3BFBF"/>
      <rect width="1" height="268.443" x="119.767" y="8" fill="#C3BFBF"/>
      <rect width="1" height="268.443" x="99.008" y="8" fill="#C3BFBF"/>
      <rect width="1" height="268.443" x="84.636" y="8" fill="#C3BFBF"/>
      <rect width="1" height="268.443" x="65.473" y="8" fill="#C3BFBF"/>
      <rect width="1" height="268.443" x="51.101" y="8" fill="#C3BFBF"/>
      <rect width="1" height="268.443" x="31.938" y="8" fill="#C3BFBF"/>
      <rect width="1" height="268.443" x="17.566" y="8" fill="#C3BFBF"/>
    </g>
    <g fill-rule="nonzero" transform="translate(313.76 356.2)">
      <rect width="182.84" height="282.4" x="1.2" y="1.2" fill="url(#linearGradient-1)" stroke="url(#linearGradient-2)" stroke-width="2.4"/>
      <rect width="32.001" height="31.971" x="143.721" y="244.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="110.186" y="244.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="76.651" y="244.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="43.116" y="244.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="9.581" y="244.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="143.721" y="211.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="110.186" y="211.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="76.651" y="211.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="43.116" y="211.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="9.581" y="211.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="143.721" y="177.6" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="110.186" y="177.6" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="76.651" y="177.6" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="43.116" y="177.6" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="9.581" y="177.6" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="143.721" y="144" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="110.186" y="144" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="76.651" y="144" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="43.116" y="144" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="9.581" y="144" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="143.721" y="110.4" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="110.186" y="110.4" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="76.651" y="110.4" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="43.116" y="110.4" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="9.581" y="110.4" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="143.721" y="76.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="110.186" y="76.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="76.651" y="76.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="43.116" y="76.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="9.581" y="76.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="143.721" y="43.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="110.186" y="43.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="76.651" y="43.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="43.116" y="43.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="9.581" y="43.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="143.721" y="8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="110.186" y="8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="76.651" y="8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="43.116" y="8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="9.581" y="8" fill="#1B4996" rx="7.022"/>
      <rect width="1" height="268.443" x="167.674" y="8" fill="#C3BFBF"/>
      <rect width="1" height="268.443" x="153.302" y="8" fill="#C3BFBF"/>
      <rect width="1" height="268.443" x="134.14" y="8" fill="#C3BFBF"/>
      <rect width="1" height="268.443" x="119.767" y="8" fill="#C3BFBF"/>
      <rect width="1" height="268.443" x="99.008" y="8" fill="#C3BFBF"/>
      <rect width="1" height="268.443" x="84.636" y="8" fill="#C3BFBF"/>
      <rect width="1" height="268.443" x="65.473" y="8" fill="#C3BFBF"/>
      <rect width="1" height="268.443" x="51.101" y="8" fill="#C3BFBF"/>
      <rect width="1" height="268.443" x="31.938" y="8" fill="#C3BFBF"/>
      <rect width="1" height="268.443" x="17.566" y="8" fill="#C3BFBF"/>
    </g>
    <g fill-rule="nonzero" transform="translate(75.76 356.2)">
      <rect width="182.84" height="282.4" x="1.2" y="1.2" fill="url(#linearGradient-1)" stroke="url(#linearGradient-2)" stroke-width="2.4"/>
      <rect width="32.001" height="31.971" x="143.721" y="244.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="110.186" y="244.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="76.651" y="244.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="43.116" y="244.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="9.581" y="244.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="143.721" y="211.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="110.186" y="211.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="76.651" y="211.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="43.116" y="211.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="9.581" y="211.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="143.721" y="177.6" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="110.186" y="177.6" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="76.651" y="177.6" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="43.116" y="177.6" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="9.581" y="177.6" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="143.721" y="144" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="110.186" y="144" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="76.651" y="144" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="43.116" y="144" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="9.581" y="144" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="143.721" y="110.4" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="110.186" y="110.4" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="76.651" y="110.4" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="43.116" y="110.4" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="9.581" y="110.4" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="143.721" y="76.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="110.186" y="76.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="76.651" y="76.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="43.116" y="76.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="9.581" y="76.8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="143.721" y="43.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="110.186" y="43.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="76.651" y="43.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="43.116" y="43.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="9.581" y="43.2" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="143.721" y="8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="110.186" y="8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="76.651" y="8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="43.116" y="8" fill="#1B4996" rx="7.022"/>
      <rect width="32.001" height="31.971" x="9.581" y="8" fill="#1B4996" rx="7.022"/>
      <rect width="1" height="268.443" x="167.674" y="8" fill="#C3BFBF"/>
      <rect width="1" height="268.443" x="153.302" y="8" fill="#C3BFBF"/>
      <rect width="1" height="268.443" x="134.14" y="8" fill="#C3BFBF"/>
      <rect width="1" height="268.443" x="119.767" y="8" fill="#C3BFBF"/>
      <rect width="1" height="268.443" x="99.008" y="8" fill="#C3BFBF"/>
      <rect width="1" height="268.443" x="84.636" y="8" fill="#C3BFBF"/>
      <rect width="1" height="268.443" x="65.473" y="8" fill="#C3BFBF"/>
      <rect width="1" height="268.443" x="51.101" y="8" fill="#C3BFBF"/>
      <rect width="1" height="268.443" x="31.938" y="8" fill="#C3BFBF"/>
      <rect width="1" height="268.443" x="17.566" y="8" fill="#C3BFBF"/>
    </g>
    <g id="k8s-animejs-k8s1" fill-rule="nonzero" transform="translate(55 337)">
      <path fill="#326CE5" d="M20.6112363,0.00352492669 C20.2442721,0.0218826534 19.8847251,0.112237028 19.5536881,0.26928739 L5.12267678,7.11679472 C4.36605878,7.4756295 3.8165021,8.15427353 3.62955897,8.96063636 L0.0693312103,24.341868 C-0.0967617268,25.0578438 0.0383842265,25.809549 0.443994889,26.4258123 C0.492675507,26.500381 0.545031054,26.5725592 0.600873769,26.642088 L10.5894443,38.9752991 C11.1131885,39.6217688 11.9072846,39.9981889 12.7469904,39.9980264 L28.7652468,39.9943607 C29.6046386,39.9949682 30.3986786,39.6192492 30.9227928,38.9734663 L40.9076722,26.6384223 C41.4316966,25.9916286 41.6280319,25.1449385 41.4410603,24.3382023 L37.8752957,8.95697067 C37.6883525,8.15060784 37.1387959,7.47196381 36.3821779,7.11312903 L21.9493209,0.26928739 C21.5329263,0.0717304911 21.0728225,-0.0196525975 20.6112363,0.00352492669 Z"/>
      <path fill="#FFF" d="M20.7542307,5.23796012 C20.2772032,5.23800821 19.8904174,5.66469971 19.8904741,6.1910393 C19.8904747,6.1991173 19.8921396,6.20683636 19.8923168,6.21486628 C19.8916139,6.28638299 19.8881353,6.37254135 19.8904741,6.43480762 C19.9018503,6.73838534 19.9684868,6.97073079 20.0085946,7.25042346 C20.0812553,7.84905455 20.14214,8.34528328 20.1045676,8.8065085 C20.0680276,8.98043226 19.9390287,9.13949443 19.8240313,9.25005689 L19.8037293,9.61296012 C19.2853678,9.65560938 18.7635389,9.73370733 18.242323,9.85122991 C15.9995318,10.3569296 14.068528,11.5041959 12.5983746,13.0532094 C12.5029792,12.9885801 12.3360861,12.8696821 12.2864595,12.833268 C12.1322431,12.8539496 11.9763806,12.9012029 11.7733733,12.7837812 C11.3868291,12.5253865 11.0347731,12.168712 10.6087783,11.7390598 C10.4135853,11.5335355 10.2722339,11.3378276 10.0403231,11.1397196 C9.98765785,11.0947302 9.90728507,11.0338809 9.84837716,10.9875935 C9.66706918,10.8440411 9.45322252,10.769176 9.24670052,10.7621537 C8.98117197,10.7531249 8.72555611,10.8562211 8.55827908,11.064573 C8.26089814,11.4349765 8.35610864,12.0011155 8.77052697,12.3292358 C8.77473207,12.3325613 8.77921002,12.3351466 8.78344641,12.3384 C8.84039352,12.3842428 8.91012836,12.4429824 8.9624729,12.4813619 C9.20856942,12.6618047 9.43337236,12.7541742 9.67857884,12.8974176 C10.1951792,13.2142393 10.6234471,13.4769402 10.96314,13.7936786 C11.0957906,13.9340991 11.1189753,14.1815331 11.1366296,14.2885466 L11.4134747,14.5341478 C9.93145018,16.7490264 9.24555711,19.4848493 9.65089729,22.2724176 L9.28915305,22.3768897 C9.19381203,22.4991543 9.05908903,22.6915372 8.91817768,22.7489572 C8.47374137,22.8879724 7.97355332,22.9390211 7.36969086,23.0018897 C7.08618318,23.0253003 6.84156316,23.0113296 6.54100124,23.0678721 C6.474849,23.0803167 6.38267716,23.1041636 6.31029701,23.1210246 C6.30778104,23.1215525 6.30543044,23.1222915 6.30291447,23.1228545 C6.29896924,23.1237636 6.29378611,23.1256639 6.28999503,23.1265202 C5.78088711,23.248678 5.45383488,23.7133824 5.55912402,24.1712416 C5.66443795,24.6292082 6.16172436,24.9077091 6.67388688,24.7980745 C6.67758406,24.7972358 6.68295264,24.797095 6.68680632,24.7962446 C6.69258832,24.7949308 6.69767873,24.7921449 6.70341702,24.790749 C6.77481205,24.7751853 6.86428365,24.7578692 6.92673872,24.7412622 C7.22223741,24.6626915 7.43624825,24.5472469 7.70190495,24.4461742 C8.27342778,24.24261 8.74678356,24.0725543 9.2079422,24.0062915 C9.40054842,23.9913109 9.60347542,24.1243067 9.70441772,24.1804117 L10.080927,24.1162622 C10.947352,26.7838762 12.7631002,28.940017 15.0622929,30.2929484 L14.905414,30.6668487 C14.9619595,30.8120346 15.0243266,31.0084733 14.9822054,31.1518528 C14.8145521,31.5835947 14.5273839,32.0392997 14.2003819,32.5473472 C14.0420501,32.7820639 13.8800076,32.9642158 13.7371278,33.2328311 C13.7029378,33.2971062 13.6593938,33.3958411 13.6263897,33.4637695 C13.4043916,33.9354622 13.5672326,34.4787372 13.9936709,34.6826111 C14.4227881,34.8877654 14.9554363,34.6713889 15.1859504,34.1987402 C15.1863047,34.1980716 15.1874682,34.1975789 15.187793,34.1969103 C15.1880293,34.1963824 15.1875568,34.1955906 15.187793,34.1950804 C15.2206264,34.1280686 15.2671423,34.0399853 15.2948398,33.9769718 C15.4172204,33.6985543 15.4579413,33.4599595 15.5440004,33.1906815 C15.7725412,32.6205853 15.8981063,32.02241 16.2127152,31.649678 C16.2988652,31.5476117 16.4393183,31.5083584 16.5849379,31.4696405 L16.7805751,31.1177343 C18.7849772,31.8817695 21.0285841,32.0867935 23.2698238,31.581444 C23.7811069,31.4661613 24.2747015,31.3169601 24.7518678,31.1378956 C24.8068518,31.2347478 24.9090349,31.4209279 24.9364312,31.4678076 C25.0844121,31.5156188 25.2459331,31.5403085 25.3775377,31.7335701 C25.612916,32.1329238 25.7738854,32.6053683 25.9699862,33.1760188 C26.0560595,33.4452921 26.098597,33.6838974 26.2209924,33.9623091 C26.2488889,34.0257666 26.2951721,34.1150868 26.3280392,34.1822504 C26.5580683,34.6564346 27.0924044,34.8735507 27.5221643,34.6679543 C27.94855,34.4639718 28.1115706,33.920746 27.8894454,33.4491126 C27.8564372,33.3811865 27.8110547,33.2824475 27.7768618,33.2181742 C27.6339678,32.9495666 27.4719512,32.7692311 27.3136076,32.5345232 C26.9865785,32.0264927 26.7153459,31.6044528 26.5476696,31.1727196 C26.4775585,30.9500469 26.5594982,30.8115619 26.6141124,30.6668545 C26.581406,30.6296246 26.5114178,30.4193419 26.470153,30.3204469 C28.8595785,28.9193818 30.6220059,26.6828346 31.4496732,24.0997724 C31.5614389,24.1172164 31.7556964,24.1513478 31.8188,24.163922 C31.9487054,24.078837 32.0681489,23.9678211 32.302356,23.9861361 C32.7635176,24.0523748 33.2368598,24.2224839 33.8083933,24.4260188 C34.0740553,24.527078 34.2880573,24.6443842 34.5835595,24.7229396 C34.6460152,24.7395431 34.735485,24.7550334 34.8068812,24.7705935 C34.8126219,24.7719894 34.817707,24.7747812 34.8234919,24.7760891 C34.8273486,24.7769455 34.8327142,24.7770804 34.8364114,24.7779191 C35.3486034,24.8874176 35.8459784,24.6090798 35.9511742,24.1510862 C36.0563452,23.6932 35.7294442,23.2283877 35.2203032,23.1063648 C35.1462457,23.0896416 35.0412177,23.0612399 34.969297,23.0477138 C34.6687321,22.9911871 34.4241162,23.0051273 34.1406074,22.9817314 C33.536742,22.9188938 33.036564,22.8677906 32.5921206,22.7287988 C32.4109082,22.6589877 32.2819932,22.4448551 32.2192996,22.3567314 L31.8704748,22.2559249 C32.0513327,20.9565455 32.002566,19.6042334 31.6896026,18.2511595 C31.3737252,16.8854874 30.8154886,15.6364475 30.0709817,14.5359836 C30.160461,14.4552041 30.3294407,14.3066047 30.3773569,14.2628897 C30.3913637,14.1089795 30.3793296,13.9476094 30.5397727,13.7771859 C30.8794485,13.4604299 31.3077507,13.1977736 31.8243339,12.8809249 C32.0695327,12.7376686 32.2961984,12.6453249 32.5422855,12.4648692 C32.597935,12.4240622 32.673925,12.3594387 32.7323858,12.3127431 C33.1467161,11.9845126 33.2421103,11.4184076 32.9446337,11.0480804 C32.6471571,10.6777531 32.0707116,10.6428704 31.6563812,10.9711009 C31.597406,11.017485 31.5173811,11.0779935 31.4644353,11.123227 C31.2325351,11.3213478 31.0893169,11.5170328 30.8941344,11.7225672 C30.4681627,12.1522416 30.1160701,12.5107062 29.7295394,12.7691214 C29.5620439,12.8659578 29.3167104,12.8324516 29.2053765,12.8259396 L28.8768536,13.0587109 C27.0035323,11.1079443 24.4529631,9.86073666 21.7065778,9.61845865 C21.6988964,9.50416422 21.6888332,9.29756891 21.6862758,9.23539413 C21.5738422,9.12855249 21.4380207,9.03733783 21.4038939,8.8065085 C21.3663215,8.34528328 21.4290518,7.84905455 21.5017125,7.25042346 C21.5418203,6.97073079 21.6084568,6.73838534 21.619833,6.43480762 C21.6224199,6.36579707 21.6182679,6.26565748 21.6179903,6.1910393 C21.6179336,5.66469971 21.2312612,5.23791202 20.7542337,5.23796012 L20.7542307,5.23796012 Z M19.6726893,11.8911859 L19.4161462,16.3908194 L19.3976898,16.3999836 C19.3804832,16.8025261 19.0468741,17.1239572 18.6372887,17.1239572 C18.4695096,17.1239572 18.3146459,17.0704504 18.1887996,16.9791625 L18.1814171,16.9828282 L14.4661561,14.3673589 C15.608007,13.2523355 17.0685241,12.4283331 18.751718,12.0488106 C19.0591852,11.9794833 19.3665154,11.9280422 19.6726893,11.8911859 Z M21.8376178,11.8911859 C23.8027584,12.1312047 25.6201343,13.0148704 27.0127752,14.3691918 L23.3215075,16.9681654 L23.308588,16.9626698 C22.9809541,17.2003056 22.5193401,17.1413437 22.2639592,16.8233736 C22.1593446,16.693112 22.104454,16.539949 22.0978522,16.3853238 L22.0941609,16.3834938 L21.8376178,11.8911859 Z M13.1188434,16.0480774 L16.5111184,19.0612739 L16.5074272,19.0796023 C16.8136175,19.3439408 16.8587697,19.8026487 16.6034001,20.1206581 C16.4987926,20.2509249 16.3587677,20.3382968 16.2084345,20.3790891 L16.2047432,20.3937519 L11.8564298,21.6400862 C11.6351144,19.6303988 12.1120752,17.6768229 13.1188434,16.0480774 Z M28.3656249,16.0499073 C28.8696512,16.8612012 29.2513254,17.7673349 29.4785421,18.7496874 C29.7030338,19.720261 29.7593732,20.6890991 29.6667968,21.6254205 L25.2963357,20.3754205 L25.2926445,20.3570921 C24.9012815,20.2508727 24.6607626,19.8555308 24.7518737,19.4589982 C24.7892016,19.2965572 24.8760314,19.1591367 24.9936518,19.0576053 L24.9918091,19.0484411 L28.3656278,16.0499073 L28.3656249,16.0499073 Z M20.0584268,19.2940422 L21.4481891,19.2940422 L22.3119457,20.3662563 L22.0018792,21.7042328 L20.7542307,22.2999073 L19.502891,21.7024 L19.1928245,20.3644235 L20.0584268,19.2940422 Z M24.513787,22.9633971 C24.5728455,22.9604352 24.6316465,22.9657196 24.6891222,22.976227 L24.6965047,22.9670628 L29.1943145,23.7221947 C28.5360581,25.5587402 27.2764611,27.1497713 25.5934828,28.2144968 L23.8475131,24.0264469 L23.8530471,24.0191155 C23.6926624,23.6490282 23.8531652,23.2150358 24.2221738,23.0385437 C24.3166496,22.9933584 24.4153535,22.9683378 24.513784,22.9633971 L24.513787,22.9633971 Z M16.9596075,22.9817255 C17.3028505,22.9865056 17.6107247,23.2230891 17.6904785,23.5700686 C17.7278158,23.7325073 17.7096435,23.8934557 17.6480289,24.0356111 L17.6609483,24.0521067 L15.933435,28.1980012 C14.318304,27.1687578 13.0318464,25.6276768 12.3436771,23.7368604 L16.8027286,22.9853941 L16.8101111,22.9945584 C16.8599881,22.9854434 16.9105727,22.9810452 16.9596075,22.9817284 L16.9596075,22.9817255 Z M20.7265462,24.7980774 C20.8461108,24.7937138 20.9674325,24.8180762 21.0827536,24.873224 C21.233919,24.9455132 21.3506941,25.0593349 21.4241958,25.1958047 L21.4408065,25.1958047 L23.6389565,29.1400862 C23.3536782,29.2350557 23.0603966,29.3162199 22.7604348,29.3838545 C21.0793115,29.7629103 19.4035297,29.6480581 17.8861157,29.1345877 L20.0787287,25.1976375 L20.08242,25.1976375 C20.2139868,24.9533906 20.4635047,24.8076745 20.7265462,24.7980774 Z"/>
    </g>
    <g id="k8s-animejs-k8s2" fill-rule="nonzero" transform="translate(293 337)">
      <path fill="#326CE5" d="M20.6112363,0.00352492669 C20.2442721,0.0218826534 19.8847251,0.112237028 19.5536881,0.26928739 L5.12267678,7.11679472 C4.36605878,7.4756295 3.8165021,8.15427353 3.62955897,8.96063636 L0.0693312103,24.341868 C-0.0967617268,25.0578438 0.0383842265,25.809549 0.443994889,26.4258123 C0.492675507,26.500381 0.545031054,26.5725592 0.600873769,26.642088 L10.5894443,38.9752991 C11.1131885,39.6217688 11.9072846,39.9981889 12.7469904,39.9980264 L28.7652468,39.9943607 C29.6046386,39.9949682 30.3986786,39.6192492 30.9227928,38.9734663 L40.9076722,26.6384223 C41.4316966,25.9916286 41.6280319,25.1449385 41.4410603,24.3382023 L37.8752957,8.95697067 C37.6883525,8.15060784 37.1387959,7.47196381 36.3821779,7.11312903 L21.9493209,0.26928739 C21.5329263,0.0717304911 21.0728225,-0.0196525975 20.6112363,0.00352492669 Z"/>
      <path fill="#FFF" d="M20.7542307,5.23796012 C20.2772032,5.23800821 19.8904174,5.66469971 19.8904741,6.1910393 C19.8904747,6.1991173 19.8921396,6.20683636 19.8923168,6.21486628 C19.8916139,6.28638299 19.8881353,6.37254135 19.8904741,6.43480762 C19.9018503,6.73838534 19.9684868,6.97073079 20.0085946,7.25042346 C20.0812553,7.84905455 20.14214,8.34528328 20.1045676,8.8065085 C20.0680276,8.98043226 19.9390287,9.13949443 19.8240313,9.25005689 L19.8037293,9.61296012 C19.2853678,9.65560938 18.7635389,9.73370733 18.242323,9.85122991 C15.9995318,10.3569296 14.068528,11.5041959 12.5983746,13.0532094 C12.5029792,12.9885801 12.3360861,12.8696821 12.2864595,12.833268 C12.1322431,12.8539496 11.9763806,12.9012029 11.7733733,12.7837812 C11.3868291,12.5253865 11.0347731,12.168712 10.6087783,11.7390598 C10.4135853,11.5335355 10.2722339,11.3378276 10.0403231,11.1397196 C9.98765785,11.0947302 9.90728507,11.0338809 9.84837716,10.9875935 C9.66706918,10.8440411 9.45322252,10.769176 9.24670052,10.7621537 C8.98117197,10.7531249 8.72555611,10.8562211 8.55827908,11.064573 C8.26089814,11.4349765 8.35610864,12.0011155 8.77052697,12.3292358 C8.77473207,12.3325613 8.77921002,12.3351466 8.78344641,12.3384 C8.84039352,12.3842428 8.91012836,12.4429824 8.9624729,12.4813619 C9.20856942,12.6618047 9.43337236,12.7541742 9.67857884,12.8974176 C10.1951792,13.2142393 10.6234471,13.4769402 10.96314,13.7936786 C11.0957906,13.9340991 11.1189753,14.1815331 11.1366296,14.2885466 L11.4134747,14.5341478 C9.93145018,16.7490264 9.24555711,19.4848493 9.65089729,22.2724176 L9.28915305,22.3768897 C9.19381203,22.4991543 9.05908903,22.6915372 8.91817768,22.7489572 C8.47374137,22.8879724 7.97355332,22.9390211 7.36969086,23.0018897 C7.08618318,23.0253003 6.84156316,23.0113296 6.54100124,23.0678721 C6.474849,23.0803167 6.38267716,23.1041636 6.31029701,23.1210246 C6.30778104,23.1215525 6.30543044,23.1222915 6.30291447,23.1228545 C6.29896924,23.1237636 6.29378611,23.1256639 6.28999503,23.1265202 C5.78088711,23.248678 5.45383488,23.7133824 5.55912402,24.1712416 C5.66443795,24.6292082 6.16172436,24.9077091 6.67388688,24.7980745 C6.67758406,24.7972358 6.68295264,24.797095 6.68680632,24.7962446 C6.69258832,24.7949308 6.69767873,24.7921449 6.70341702,24.790749 C6.77481205,24.7751853 6.86428365,24.7578692 6.92673872,24.7412622 C7.22223741,24.6626915 7.43624825,24.5472469 7.70190495,24.4461742 C8.27342778,24.24261 8.74678356,24.0725543 9.2079422,24.0062915 C9.40054842,23.9913109 9.60347542,24.1243067 9.70441772,24.1804117 L10.080927,24.1162622 C10.947352,26.7838762 12.7631002,28.940017 15.0622929,30.2929484 L14.905414,30.6668487 C14.9619595,30.8120346 15.0243266,31.0084733 14.9822054,31.1518528 C14.8145521,31.5835947 14.5273839,32.0392997 14.2003819,32.5473472 C14.0420501,32.7820639 13.8800076,32.9642158 13.7371278,33.2328311 C13.7029378,33.2971062 13.6593938,33.3958411 13.6263897,33.4637695 C13.4043916,33.9354622 13.5672326,34.4787372 13.9936709,34.6826111 C14.4227881,34.8877654 14.9554363,34.6713889 15.1859504,34.1987402 C15.1863047,34.1980716 15.1874682,34.1975789 15.187793,34.1969103 C15.1880293,34.1963824 15.1875568,34.1955906 15.187793,34.1950804 C15.2206264,34.1280686 15.2671423,34.0399853 15.2948398,33.9769718 C15.4172204,33.6985543 15.4579413,33.4599595 15.5440004,33.1906815 C15.7725412,32.6205853 15.8981063,32.02241 16.2127152,31.649678 C16.2988652,31.5476117 16.4393183,31.5083584 16.5849379,31.4696405 L16.7805751,31.1177343 C18.7849772,31.8817695 21.0285841,32.0867935 23.2698238,31.581444 C23.7811069,31.4661613 24.2747015,31.3169601 24.7518678,31.1378956 C24.8068518,31.2347478 24.9090349,31.4209279 24.9364312,31.4678076 C25.0844121,31.5156188 25.2459331,31.5403085 25.3775377,31.7335701 C25.612916,32.1329238 25.7738854,32.6053683 25.9699862,33.1760188 C26.0560595,33.4452921 26.098597,33.6838974 26.2209924,33.9623091 C26.2488889,34.0257666 26.2951721,34.1150868 26.3280392,34.1822504 C26.5580683,34.6564346 27.0924044,34.8735507 27.5221643,34.6679543 C27.94855,34.4639718 28.1115706,33.920746 27.8894454,33.4491126 C27.8564372,33.3811865 27.8110547,33.2824475 27.7768618,33.2181742 C27.6339678,32.9495666 27.4719512,32.7692311 27.3136076,32.5345232 C26.9865785,32.0264927 26.7153459,31.6044528 26.5476696,31.1727196 C26.4775585,30.9500469 26.5594982,30.8115619 26.6141124,30.6668545 C26.581406,30.6296246 26.5114178,30.4193419 26.470153,30.3204469 C28.8595785,28.9193818 30.6220059,26.6828346 31.4496732,24.0997724 C31.5614389,24.1172164 31.7556964,24.1513478 31.8188,24.163922 C31.9487054,24.078837 32.0681489,23.9678211 32.302356,23.9861361 C32.7635176,24.0523748 33.2368598,24.2224839 33.8083933,24.4260188 C34.0740553,24.527078 34.2880573,24.6443842 34.5835595,24.7229396 C34.6460152,24.7395431 34.735485,24.7550334 34.8068812,24.7705935 C34.8126219,24.7719894 34.817707,24.7747812 34.8234919,24.7760891 C34.8273486,24.7769455 34.8327142,24.7770804 34.8364114,24.7779191 C35.3486034,24.8874176 35.8459784,24.6090798 35.9511742,24.1510862 C36.0563452,23.6932 35.7294442,23.2283877 35.2203032,23.1063648 C35.1462457,23.0896416 35.0412177,23.0612399 34.969297,23.0477138 C34.6687321,22.9911871 34.4241162,23.0051273 34.1406074,22.9817314 C33.536742,22.9188938 33.036564,22.8677906 32.5921206,22.7287988 C32.4109082,22.6589877 32.2819932,22.4448551 32.2192996,22.3567314 L31.8704748,22.2559249 C32.0513327,20.9565455 32.002566,19.6042334 31.6896026,18.2511595 C31.3737252,16.8854874 30.8154886,15.6364475 30.0709817,14.5359836 C30.160461,14.4552041 30.3294407,14.3066047 30.3773569,14.2628897 C30.3913637,14.1089795 30.3793296,13.9476094 30.5397727,13.7771859 C30.8794485,13.4604299 31.3077507,13.1977736 31.8243339,12.8809249 C32.0695327,12.7376686 32.2961984,12.6453249 32.5422855,12.4648692 C32.597935,12.4240622 32.673925,12.3594387 32.7323858,12.3127431 C33.1467161,11.9845126 33.2421103,11.4184076 32.9446337,11.0480804 C32.6471571,10.6777531 32.0707116,10.6428704 31.6563812,10.9711009 C31.597406,11.017485 31.5173811,11.0779935 31.4644353,11.123227 C31.2325351,11.3213478 31.0893169,11.5170328 30.8941344,11.7225672 C30.4681627,12.1522416 30.1160701,12.5107062 29.7295394,12.7691214 C29.5620439,12.8659578 29.3167104,12.8324516 29.2053765,12.8259396 L28.8768536,13.0587109 C27.0035323,11.1079443 24.4529631,9.86073666 21.7065778,9.61845865 C21.6988964,9.50416422 21.6888332,9.29756891 21.6862758,9.23539413 C21.5738422,9.12855249 21.4380207,9.03733783 21.4038939,8.8065085 C21.3663215,8.34528328 21.4290518,7.84905455 21.5017125,7.25042346 C21.5418203,6.97073079 21.6084568,6.73838534 21.619833,6.43480762 C21.6224199,6.36579707 21.6182679,6.26565748 21.6179903,6.1910393 C21.6179336,5.66469971 21.2312612,5.23791202 20.7542337,5.23796012 L20.7542307,5.23796012 Z M19.6726893,11.8911859 L19.4161462,16.3908194 L19.3976898,16.3999836 C19.3804832,16.8025261 19.0468741,17.1239572 18.6372887,17.1239572 C18.4695096,17.1239572 18.3146459,17.0704504 18.1887996,16.9791625 L18.1814171,16.9828282 L14.4661561,14.3673589 C15.608007,13.2523355 17.0685241,12.4283331 18.751718,12.0488106 C19.0591852,11.9794833 19.3665154,11.9280422 19.6726893,11.8911859 Z M21.8376178,11.8911859 C23.8027584,12.1312047 25.6201343,13.0148704 27.0127752,14.3691918 L23.3215075,16.9681654 L23.308588,16.9626698 C22.9809541,17.2003056 22.5193401,17.1413437 22.2639592,16.8233736 C22.1593446,16.693112 22.104454,16.539949 22.0978522,16.3853238 L22.0941609,16.3834938 L21.8376178,11.8911859 Z M13.1188434,16.0480774 L16.5111184,19.0612739 L16.5074272,19.0796023 C16.8136175,19.3439408 16.8587697,19.8026487 16.6034001,20.1206581 C16.4987926,20.2509249 16.3587677,20.3382968 16.2084345,20.3790891 L16.2047432,20.3937519 L11.8564298,21.6400862 C11.6351144,19.6303988 12.1120752,17.6768229 13.1188434,16.0480774 Z M28.3656249,16.0499073 C28.8696512,16.8612012 29.2513254,17.7673349 29.4785421,18.7496874 C29.7030338,19.720261 29.7593732,20.6890991 29.6667968,21.6254205 L25.2963357,20.3754205 L25.2926445,20.3570921 C24.9012815,20.2508727 24.6607626,19.8555308 24.7518737,19.4589982 C24.7892016,19.2965572 24.8760314,19.1591367 24.9936518,19.0576053 L24.9918091,19.0484411 L28.3656278,16.0499073 L28.3656249,16.0499073 Z M20.0584268,19.2940422 L21.4481891,19.2940422 L22.3119457,20.3662563 L22.0018792,21.7042328 L20.7542307,22.2999073 L19.502891,21.7024 L19.1928245,20.3644235 L20.0584268,19.2940422 Z M24.513787,22.9633971 C24.5728455,22.9604352 24.6316465,22.9657196 24.6891222,22.976227 L24.6965047,22.9670628 L29.1943145,23.7221947 C28.5360581,25.5587402 27.2764611,27.1497713 25.5934828,28.2144968 L23.8475131,24.0264469 L23.8530471,24.0191155 C23.6926624,23.6490282 23.8531652,23.2150358 24.2221738,23.0385437 C24.3166496,22.9933584 24.4153535,22.9683378 24.513784,22.9633971 L24.513787,22.9633971 Z M16.9596075,22.9817255 C17.3028505,22.9865056 17.6107247,23.2230891 17.6904785,23.5700686 C17.7278158,23.7325073 17.7096435,23.8934557 17.6480289,24.0356111 L17.6609483,24.0521067 L15.933435,28.1980012 C14.318304,27.1687578 13.0318464,25.6276768 12.3436771,23.7368604 L16.8027286,22.9853941 L16.8101111,22.9945584 C16.8599881,22.9854434 16.9105727,22.9810452 16.9596075,22.9817284 L16.9596075,22.9817255 Z M20.7265462,24.7980774 C20.8461108,24.7937138 20.9674325,24.8180762 21.0827536,24.873224 C21.233919,24.9455132 21.3506941,25.0593349 21.4241958,25.1958047 L21.4408065,25.1958047 L23.6389565,29.1400862 C23.3536782,29.2350557 23.0603966,29.3162199 22.7604348,29.3838545 C21.0793115,29.7629103 19.4035297,29.6480581 17.8861157,29.1345877 L20.0787287,25.1976375 L20.08242,25.1976375 C20.2139868,24.9533906 20.4635047,24.8076745 20.7265462,24.7980774 Z"/>
    </g>
    <g id="k8s-animejs-k8s3" fill-rule="nonzero" transform="translate(532 337)">
      <path fill="#326CE5" d="M20.6112363,0.00352492669 C20.2442721,0.0218826534 19.8847251,0.112237028 19.5536881,0.26928739 L5.12267678,7.11679472 C4.36605878,7.4756295 3.8165021,8.15427353 3.62955897,8.96063636 L0.0693312103,24.341868 C-0.0967617268,25.0578438 0.0383842265,25.809549 0.443994889,26.4258123 C0.492675507,26.500381 0.545031054,26.5725592 0.600873769,26.642088 L10.5894443,38.9752991 C11.1131885,39.6217688 11.9072846,39.9981889 12.7469904,39.9980264 L28.7652468,39.9943607 C29.6046386,39.9949682 30.3986786,39.6192492 30.9227928,38.9734663 L40.9076722,26.6384223 C41.4316966,25.9916286 41.6280319,25.1449385 41.4410603,24.3382023 L37.8752957,8.95697067 C37.6883525,8.15060784 37.1387959,7.47196381 36.3821779,7.11312903 L21.9493209,0.26928739 C21.5329263,0.0717304911 21.0728225,-0.0196525975 20.6112363,0.00352492669 Z"/>
      <path fill="#FFF" d="M20.7542307,5.23796012 C20.2772032,5.23800821 19.8904174,5.66469971 19.8904741,6.1910393 C19.8904747,6.1991173 19.8921396,6.20683636 19.8923168,6.21486628 C19.8916139,6.28638299 19.8881353,6.37254135 19.8904741,6.43480762 C19.9018503,6.73838534 19.9684868,6.97073079 20.0085946,7.25042346 C20.0812553,7.84905455 20.14214,8.34528328 20.1045676,8.8065085 C20.0680276,8.98043226 19.9390287,9.13949443 19.8240313,9.25005689 L19.8037293,9.61296012 C19.2853678,9.65560938 18.7635389,9.73370733 18.242323,9.85122991 C15.9995318,10.3569296 14.068528,11.5041959 12.5983746,13.0532094 C12.5029792,12.9885801 12.3360861,12.8696821 12.2864595,12.833268 C12.1322431,12.8539496 11.9763806,12.9012029 11.7733733,12.7837812 C11.3868291,12.5253865 11.0347731,12.168712 10.6087783,11.7390598 C10.4135853,11.5335355 10.2722339,11.3378276 10.0403231,11.1397196 C9.98765785,11.0947302 9.90728507,11.0338809 9.84837716,10.9875935 C9.66706918,10.8440411 9.45322252,10.769176 9.24670052,10.7621537 C8.98117197,10.7531249 8.72555611,10.8562211 8.55827908,11.064573 C8.26089814,11.4349765 8.35610864,12.0011155 8.77052697,12.3292358 C8.77473207,12.3325613 8.77921002,12.3351466 8.78344641,12.3384 C8.84039352,12.3842428 8.91012836,12.4429824 8.9624729,12.4813619 C9.20856942,12.6618047 9.43337236,12.7541742 9.67857884,12.8974176 C10.1951792,13.2142393 10.6234471,13.4769402 10.96314,13.7936786 C11.0957906,13.9340991 11.1189753,14.1815331 11.1366296,14.2885466 L11.4134747,14.5341478 C9.93145018,16.7490264 9.24555711,19.4848493 9.65089729,22.2724176 L9.28915305,22.3768897 C9.19381203,22.4991543 9.05908903,22.6915372 8.91817768,22.7489572 C8.47374137,22.8879724 7.97355332,22.9390211 7.36969086,23.0018897 C7.08618318,23.0253003 6.84156316,23.0113296 6.54100124,23.0678721 C6.474849,23.0803167 6.38267716,23.1041636 6.31029701,23.1210246 C6.30778104,23.1215525 6.30543044,23.1222915 6.30291447,23.1228545 C6.29896924,23.1237636 6.29378611,23.1256639 6.28999503,23.1265202 C5.78088711,23.248678 5.45383488,23.7133824 5.55912402,24.1712416 C5.66443795,24.6292082 6.16172436,24.9077091 6.67388688,24.7980745 C6.67758406,24.7972358 6.68295264,24.797095 6.68680632,24.7962446 C6.69258832,24.7949308 6.69767873,24.7921449 6.70341702,24.790749 C6.77481205,24.7751853 6.86428365,24.7578692 6.92673872,24.7412622 C7.22223741,24.6626915 7.43624825,24.5472469 7.70190495,24.4461742 C8.27342778,24.24261 8.74678356,24.0725543 9.2079422,24.0062915 C9.40054842,23.9913109 9.60347542,24.1243067 9.70441772,24.1804117 L10.080927,24.1162622 C10.947352,26.7838762 12.7631002,28.940017 15.0622929,30.2929484 L14.905414,30.6668487 C14.9619595,30.8120346 15.0243266,31.0084733 14.9822054,31.1518528 C14.8145521,31.5835947 14.5273839,32.0392997 14.2003819,32.5473472 C14.0420501,32.7820639 13.8800076,32.9642158 13.7371278,33.2328311 C13.7029378,33.2971062 13.6593938,33.3958411 13.6263897,33.4637695 C13.4043916,33.9354622 13.5672326,34.4787372 13.9936709,34.6826111 C14.4227881,34.8877654 14.9554363,34.6713889 15.1859504,34.1987402 C15.1863047,34.1980716 15.1874682,34.1975789 15.187793,34.1969103 C15.1880293,34.1963824 15.1875568,34.1955906 15.187793,34.1950804 C15.2206264,34.1280686 15.2671423,34.0399853 15.2948398,33.9769718 C15.4172204,33.6985543 15.4579413,33.4599595 15.5440004,33.1906815 C15.7725412,32.6205853 15.8981063,32.02241 16.2127152,31.649678 C16.2988652,31.5476117 16.4393183,31.5083584 16.5849379,31.4696405 L16.7805751,31.1177343 C18.7849772,31.8817695 21.0285841,32.0867935 23.2698238,31.581444 C23.7811069,31.4661613 24.2747015,31.3169601 24.7518678,31.1378956 C24.8068518,31.2347478 24.9090349,31.4209279 24.9364312,31.4678076 C25.0844121,31.5156188 25.2459331,31.5403085 25.3775377,31.7335701 C25.612916,32.1329238 25.7738854,32.6053683 25.9699862,33.1760188 C26.0560595,33.4452921 26.098597,33.6838974 26.2209924,33.9623091 C26.2488889,34.0257666 26.2951721,34.1150868 26.3280392,34.1822504 C26.5580683,34.6564346 27.0924044,34.8735507 27.5221643,34.6679543 C27.94855,34.4639718 28.1115706,33.920746 27.8894454,33.4491126 C27.8564372,33.3811865 27.8110547,33.2824475 27.7768618,33.2181742 C27.6339678,32.9495666 27.4719512,32.7692311 27.3136076,32.5345232 C26.9865785,32.0264927 26.7153459,31.6044528 26.5476696,31.1727196 C26.4775585,30.9500469 26.5594982,30.8115619 26.6141124,30.6668545 C26.581406,30.6296246 26.5114178,30.4193419 26.470153,30.3204469 C28.8595785,28.9193818 30.6220059,26.6828346 31.4496732,24.0997724 C31.5614389,24.1172164 31.7556964,24.1513478 31.8188,24.163922 C31.9487054,24.078837 32.0681489,23.9678211 32.302356,23.9861361 C32.7635176,24.0523748 33.2368598,24.2224839 33.8083933,24.4260188 C34.0740553,24.527078 34.2880573,24.6443842 34.5835595,24.7229396 C34.6460152,24.7395431 34.735485,24.7550334 34.8068812,24.7705935 C34.8126219,24.7719894 34.817707,24.7747812 34.8234919,24.7760891 C34.8273486,24.7769455 34.8327142,24.7770804 34.8364114,24.7779191 C35.3486034,24.8874176 35.8459784,24.6090798 35.9511742,24.1510862 C36.0563452,23.6932 35.7294442,23.2283877 35.2203032,23.1063648 C35.1462457,23.0896416 35.0412177,23.0612399 34.969297,23.0477138 C34.6687321,22.9911871 34.4241162,23.0051273 34.1406074,22.9817314 C33.536742,22.9188938 33.036564,22.8677906 32.5921206,22.7287988 C32.4109082,22.6589877 32.2819932,22.4448551 32.2192996,22.3567314 L31.8704748,22.2559249 C32.0513327,20.9565455 32.002566,19.6042334 31.6896026,18.2511595 C31.3737252,16.8854874 30.8154886,15.6364475 30.0709817,14.5359836 C30.160461,14.4552041 30.3294407,14.3066047 30.3773569,14.2628897 C30.3913637,14.1089795 30.3793296,13.9476094 30.5397727,13.7771859 C30.8794485,13.4604299 31.3077507,13.1977736 31.8243339,12.8809249 C32.0695327,12.7376686 32.2961984,12.6453249 32.5422855,12.4648692 C32.597935,12.4240622 32.673925,12.3594387 32.7323858,12.3127431 C33.1467161,11.9845126 33.2421103,11.4184076 32.9446337,11.0480804 C32.6471571,10.6777531 32.0707116,10.6428704 31.6563812,10.9711009 C31.597406,11.017485 31.5173811,11.0779935 31.4644353,11.123227 C31.2325351,11.3213478 31.0893169,11.5170328 30.8941344,11.7225672 C30.4681627,12.1522416 30.1160701,12.5107062 29.7295394,12.7691214 C29.5620439,12.8659578 29.3167104,12.8324516 29.2053765,12.8259396 L28.8768536,13.0587109 C27.0035323,11.1079443 24.4529631,9.86073666 21.7065778,9.61845865 C21.6988964,9.50416422 21.6888332,9.29756891 21.6862758,9.23539413 C21.5738422,9.12855249 21.4380207,9.03733783 21.4038939,8.8065085 C21.3663215,8.34528328 21.4290518,7.84905455 21.5017125,7.25042346 C21.5418203,6.97073079 21.6084568,6.73838534 21.619833,6.43480762 C21.6224199,6.36579707 21.6182679,6.26565748 21.6179903,6.1910393 C21.6179336,5.66469971 21.2312612,5.23791202 20.7542337,5.23796012 L20.7542307,5.23796012 Z M19.6726893,11.8911859 L19.4161462,16.3908194 L19.3976898,16.3999836 C19.3804832,16.8025261 19.0468741,17.1239572 18.6372887,17.1239572 C18.4695096,17.1239572 18.3146459,17.0704504 18.1887996,16.9791625 L18.1814171,16.9828282 L14.4661561,14.3673589 C15.608007,13.2523355 17.0685241,12.4283331 18.751718,12.0488106 C19.0591852,11.9794833 19.3665154,11.9280422 19.6726893,11.8911859 Z M21.8376178,11.8911859 C23.8027584,12.1312047 25.6201343,13.0148704 27.0127752,14.3691918 L23.3215075,16.9681654 L23.308588,16.9626698 C22.9809541,17.2003056 22.5193401,17.1413437 22.2639592,16.8233736 C22.1593446,16.693112 22.104454,16.539949 22.0978522,16.3853238 L22.0941609,16.3834938 L21.8376178,11.8911859 Z M13.1188434,16.0480774 L16.5111184,19.0612739 L16.5074272,19.0796023 C16.8136175,19.3439408 16.8587697,19.8026487 16.6034001,20.1206581 C16.4987926,20.2509249 16.3587677,20.3382968 16.2084345,20.3790891 L16.2047432,20.3937519 L11.8564298,21.6400862 C11.6351144,19.6303988 12.1120752,17.6768229 13.1188434,16.0480774 Z M28.3656249,16.0499073 C28.8696512,16.8612012 29.2513254,17.7673349 29.4785421,18.7496874 C29.7030338,19.720261 29.7593732,20.6890991 29.6667968,21.6254205 L25.2963357,20.3754205 L25.2926445,20.3570921 C24.9012815,20.2508727 24.6607626,19.8555308 24.7518737,19.4589982 C24.7892016,19.2965572 24.8760314,19.1591367 24.9936518,19.0576053 L24.9918091,19.0484411 L28.3656278,16.0499073 L28.3656249,16.0499073 Z M20.0584268,19.2940422 L21.4481891,19.2940422 L22.3119457,20.3662563 L22.0018792,21.7042328 L20.7542307,22.2999073 L19.502891,21.7024 L19.1928245,20.3644235 L20.0584268,19.2940422 Z M24.513787,22.9633971 C24.5728455,22.9604352 24.6316465,22.9657196 24.6891222,22.976227 L24.6965047,22.9670628 L29.1943145,23.7221947 C28.5360581,25.5587402 27.2764611,27.1497713 25.5934828,28.2144968 L23.8475131,24.0264469 L23.8530471,24.0191155 C23.6926624,23.6490282 23.8531652,23.2150358 24.2221738,23.0385437 C24.3166496,22.9933584 24.4153535,22.9683378 24.513784,22.9633971 L24.513787,22.9633971 Z M16.9596075,22.9817255 C17.3028505,22.9865056 17.6107247,23.2230891 17.6904785,23.5700686 C17.7278158,23.7325073 17.7096435,23.8934557 17.6480289,24.0356111 L17.6609483,24.0521067 L15.933435,28.1980012 C14.318304,27.1687578 13.0318464,25.6276768 12.3436771,23.7368604 L16.8027286,22.9853941 L16.8101111,22.9945584 C16.8599881,22.9854434 16.9105727,22.9810452 16.9596075,22.9817284 L16.9596075,22.9817255 Z M20.7265462,24.7980774 C20.8461108,24.7937138 20.9674325,24.8180762 21.0827536,24.873224 C21.233919,24.9455132 21.3506941,25.0593349 21.4241958,25.1958047 L21.4408065,25.1958047 L23.6389565,29.1400862 C23.3536782,29.2350557 23.0603966,29.3162199 22.7604348,29.3838545 C21.0793115,29.7629103 19.4035297,29.6480581 17.8861157,29.1345877 L20.0787287,25.1976375 L20.08242,25.1976375 C20.2139868,24.9533906 20.4635047,24.8076745 20.7265462,24.7980774 Z"/>
    </g>
    <g id="k8s-animejs-app1" transform="translate(90 493)">
      <g transform="translate(.132 .8)">
        <path fill="#00C176" d="M158.400002,134.890599 C158.400002,135.741965 157.904038,136.432001 157.291993,136.432001 L1.108009,136.432001 C0.49596405,136.432001 0,135.741965 0,134.890599 L-4.4408921e-16,3.96000004 C-7.11925298e-16,1.77295241 1.77295241,-1.29209222e-14 3.96000004,-1.33226763e-14 L154.440002,-4.4408921e-16 C156.627049,-8.45843342e-16 158.400002,1.77295241 158.400002,3.96000004 L158.400002,134.890599 Z"/>
        <text fill="#FFF" font-size="26.928" font-weight="bold" class="sans-serif">
          <tspan x="51.516" y="86.234">APP</tspan>
        </text>
        <path fill="#CCC" d="M3.96000004,0 L154.440002,0 C156.627049,-4.01754132e-16 158.400002,1.77295241 158.400002,3.96000004 L158.400002,18.2160002 L0,18.2160002 L0,3.96000004 C-2.67836088e-16,1.77295241 1.77295241,-4.23350776e-17 3.96000004,-4.4408921e-16 Z"/>
        <path fill="#E74C3C" d="M13.4640001,9.9000001 C13.4640001,11.8685633 11.8685633,13.4640001 9.9000001,13.4640001 C7.9314369,13.4640001 6.33600006,11.8685633 6.33600006,9.9000001 C6.33600006,7.9314369 7.9314369,6.33600006 9.9000001,6.33600006 C11.8685633,6.33600006 13.4640001,7.9314369 13.4640001,9.9000001"/>
        <path fill="#F1C40F" d="M26.1360003,9.9000001 C26.1360003,11.8685633 24.5405634,13.4640001 22.5720002,13.4640001 C20.603437,13.4640001 19.0080002,11.8685633 19.0080002,9.9000001 C19.0080002,7.9314369 20.603437,6.33600006 22.5720002,6.33600006 C24.5405634,6.33600006 26.1360003,7.9314369 26.1360003,9.9000001"/>
        <path fill="#2ECC71" d="M38.0160004,9.9000001 C38.0160004,11.8685633 36.4205635,13.4640001 34.4520003,13.4640001 C32.4834372,13.4640001 30.8880003,11.8685633 30.8880003,9.9000001 C30.8880003,7.9314369 32.4834372,6.33600006 34.4520003,6.33600006 C36.4205635,6.33600006 38.0160004,7.9314369 38.0160004,9.9000001"/>
      </g>
    </g>
    <g id="k8s-animejs-app2" transform="translate(328 493)">
      <g transform="translate(.132 .8)">
        <path fill="#00C176" d="M158.400002,134.890599 C158.400002,135.741965 157.904038,136.432001 157.291993,136.432001 L1.108009,136.432001 C0.49596405,136.432001 0,135.741965 0,134.890599 L-4.4408921e-16,3.96000004 C-7.11925298e-16,1.77295241 1.77295241,-1.29209222e-14 3.96000004,-1.33226763e-14 L154.440002,-4.4408921e-16 C156.627049,-8.45843342e-16 158.400002,1.77295241 158.400002,3.96000004 L158.400002,134.890599 Z"/>
        <text fill="#FFF" font-size="26.928" font-weight="bold" class="sans-serif">
          <tspan x="51.516" y="86.234">APP</tspan>
        </text>
        <path fill="#CCC" d="M3.96000004,0 L154.440002,0 C156.627049,-4.01754132e-16 158.400002,1.77295241 158.400002,3.96000004 L158.400002,18.2160002 L0,18.2160002 L0,3.96000004 C-2.67836088e-16,1.77295241 1.77295241,-4.23350776e-17 3.96000004,-4.4408921e-16 Z"/>
        <path fill="#E74C3C" d="M13.4640001,9.9000001 C13.4640001,11.8685633 11.8685633,13.4640001 9.9000001,13.4640001 C7.9314369,13.4640001 6.33600006,11.8685633 6.33600006,9.9000001 C6.33600006,7.9314369 7.9314369,6.33600006 9.9000001,6.33600006 C11.8685633,6.33600006 13.4640001,7.9314369 13.4640001,9.9000001"/>
        <path fill="#F1C40F" d="M26.1360003,9.9000001 C26.1360003,11.8685633 24.5405634,13.4640001 22.5720002,13.4640001 C20.603437,13.4640001 19.0080002,11.8685633 19.0080002,9.9000001 C19.0080002,7.9314369 20.603437,6.33600006 22.5720002,6.33600006 C24.5405634,6.33600006 26.1360003,7.9314369 26.1360003,9.9000001"/>
        <path fill="#2ECC71" d="M38.0160004,9.9000001 C38.0160004,11.8685633 36.4205635,13.4640001 34.4520003,13.4640001 C32.4834372,13.4640001 30.8880003,11.8685633 30.8880003,9.9000001 C30.8880003,7.9314369 32.4834372,6.33600006 34.4520003,6.33600006 C36.4205635,6.33600006 38.0160004,7.9314369 38.0160004,9.9000001"/>
      </g>
    </g>
    <g id="k8s-animejs-app3" transform="translate(567 493)">
      <g transform="translate(.132 .8)">
        <path fill="#00C176" d="M158.400002,134.890599 C158.400002,135.741965 157.904038,136.432001 157.291993,136.432001 L1.108009,136.432001 C0.49596405,136.432001 0,135.741965 0,134.890599 L-4.4408921e-16,3.96000004 C-7.11925298e-16,1.77295241 1.77295241,-1.29209222e-14 3.96000004,-1.33226763e-14 L154.440002,-4.4408921e-16 C156.627049,-8.45843342e-16 158.400002,1.77295241 158.400002,3.96000004 L158.400002,134.890599 Z"/>
        <text fill="#FFF" font-size="26.928" font-weight="bold" class="sans-serif">
          <tspan x="51.516" y="86.234">APP</tspan>
        </text>
        <path fill="#CCC" d="M3.96000004,0 L154.440002,0 C156.627049,-4.01754132e-16 158.400002,1.77295241 158.400002,3.96000004 L158.400002,18.2160002 L0,18.2160002 L0,3.96000004 C-2.67836088e-16,1.77295241 1.77295241,-4.23350776e-17 3.96000004,-4.4408921e-16 Z"/>
        <path fill="#E74C3C" d="M13.4640001,9.9000001 C13.4640001,11.8685633 11.8685633,13.4640001 9.9000001,13.4640001 C7.9314369,13.4640001 6.33600006,11.8685633 6.33600006,9.9000001 C6.33600006,7.9314369 7.9314369,6.33600006 9.9000001,6.33600006 C11.8685633,6.33600006 13.4640001,7.9314369 13.4640001,9.9000001"/>
        <path fill="#F1C40F" d="M26.1360003,9.9000001 C26.1360003,11.8685633 24.5405634,13.4640001 22.5720002,13.4640001 C20.603437,13.4640001 19.0080002,11.8685633 19.0080002,9.9000001 C19.0080002,7.9314369 20.603437,6.33600006 22.5720002,6.33600006 C24.5405634,6.33600006 26.1360003,7.9314369 26.1360003,9.9000001"/>
        <path fill="#2ECC71" d="M38.0160004,9.9000001 C38.0160004,11.8685633 36.4205635,13.4640001 34.4520003,13.4640001 C32.4834372,13.4640001 30.8880003,11.8685633 30.8880003,9.9000001 C30.8880003,7.9314369 32.4834372,6.33600006 34.4520003,6.33600006 C36.4205635,6.33600006 38.0160004,7.9314369 38.0160004,9.9000001"/>
      </g>
    </g>
  </g>
</svg>
<script src="anime.min.js"></script>
<script src="isScrolledIntoView.js"></script>
<script>
(function() {
  const svg = document.querySelector('#k8s')
  const wrapper = document.createElement('div')
  wrapper.classList = 'relative'
  const restart = document.createElement('div')
  restart.classList = 'restart'
  restart.innerHTML = '<span>Restart</span>'
  wrap(svg, wrapper)
  wrapper.appendChild(restart)
  const basicTimeline = anime.timeline({
    autoplay: false,
  });
  basicTimeline
  .add({
    begin: function() {
      wrapper.onclick = function() {}
      restart.classList.add('inactive')
    }
  })
  .add({
    targets: ['#k8s-animejs-k8s', '#k8s-animejs-k8s1', '#k8s-animejs-k8s2', '#k8s-animejs-k8s3'],
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: '#k8s-animejs-wifi-1',
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: '#k8s-animejs-wifi-2',
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: '#k8s-animejs-wifi-3',
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: ['#k8s-animejs-app1', '#k8s-animejs-app2', '#k8s-animejs-app3'],
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: ['#k8s-animejs-wifi-1', '#k8s-animejs-wifi-2', '#k8s-animejs-wifi-3'],
    opacity: [1, 0],
    easing: 'easeOutExpo',
  })
  .add({
    complete: function() {
      wrapper.onclick = basicTimeline.restart
      restart.classList.remove('inactive')
    }
  })
  wrapper.onclick = basicTimeline.restart
  onScrollIntoView(svg, function() {
    setTimeout(basicTimeline.play, 1000)
  });
  function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }
})();
</script>
```

**This time, however, you're not locked in.**

Kubernetes is a major open source effort which you're free to download, customise and contribute to.

_Is it secure?_

Communication between the kubelet and the master node is secured using TLS.

![The communication between the Kubernetes master and the kubelet is encrypted](encrypted.png)

Each node can be provisioned with its own certificate, so even if one node is compromised, you can reject only a single certificate while keeping the rest of the cluster available.

And even better, the community has a wealth of shared resources regarding good practices on how to secure your cluster, gleaned from thousands of real-world Kubernetes deployments.

You should check out [these collections of](https://kubernetes-security.info/) [kubernetes security best practices](https://github.com/freach/kubernetes-security-best-practice) to see what I mean.

_Now, if only it had a way to roll-out updates…_

Kubernetes doesn't know how to deploy applications written in C, Java or Node.js.

In fact, it doesn't know how to deploy applications at all.

_That's not useful, is it?_

Kubernetes is only able to deploy Linux containers — that's why it's also called a 'container orchestrator'.

**Containers are essentially archives — similar to zip files.**

To run the container you unpack the archive and run the application as a process on the host.

You probably don't want processes to interfere with one another, so Linux containers have a nice feature where each process is isolated from the others.

So instead of developing your mechanism to distribute applications, you can:

1. Ask Kubernetes to schedule a deployment
2. Wait for the agent on each node (the kubelet) to pick up the task
3. Let the kubelet download the archive and run it as an isolated process.

**Containers are also designed to be efficient.**

When you update your package and wish to redistribute it, you can only ship the difference between the previous and the current container.

```include
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 733.7 487" id="layers">
  <path fill="#005FAD" d="M345.5 291.8V280h-293v11.8L199 376.3z"/>
  <path fill="#0071CE" d="M345.5 280L199 195.4 52.5 280 199 364.5z"/>
  <g fill="#2D536D">
    <path d="M158.4 319.5l-32.3-10.1 6.2-3.6 21.6 7.2h.1l-12.5-12.5 5.9-3.4 17.6 18.6-6.6 3.8zM182.9 305.3L161 292.7l-7.3 4.2-5.2-3c1.1-.6 2-1.2 2.7-1.9.8-.7 1.2-1.4 1.5-2.1s.2-1.5-.2-2.3c-.3-.8-1.1-1.6-2.2-2.5l4.7-2.7 33.7 19.5-5.8 3.4zM197.3 288.4l7.4 4.3-6.6 3.8-7.4-4.3 6.6-3.8zM183.8 275.6c-1.7-1.6-2.7-3.1-3.1-4.4s-.2-2.6.5-3.6 1.8-2 3.2-2.9c1.5-.9 3.1-1.5 5-1.9 1.9-.4 4-.5 6.3-.3s4.9.8 7.7 1.8 5.8 2.4 9.1 4.3c3.4 1.9 5.9 3.7 7.6 5.4 1.7 1.6 2.7 3.1 3.1 4.5.4 1.3.2 2.6-.5 3.6-.7 1.1-1.8 2-3.3 2.9-1.4.8-3.1 1.5-5 1.9-1.9.4-4 .5-6.3.3s-4.9-.8-7.7-1.8-5.9-2.4-9.3-4.4c-3.2-2-5.7-3.7-7.3-5.4zm16.9 3.9c1.4.8 2.9 1.4 4.5 2 1.6.6 3.1.9 4.7 1.1 1.5.2 2.9-.1 4.1-.8 1.2-.7 1.7-1.5 1.5-2.4-.2-.9-.9-1.8-1.8-2.7-1-.9-2.1-1.8-3.4-2.6-1.3-.8-2.4-1.5-3.4-2.1-.6-.3-1.3-.7-2.1-1.2s-1.7-.9-2.7-1.4c-1-.4-2-.9-3-1.2-1-.4-2.1-.7-3.1-.9-1-.2-2-.2-3-.2-1 .1-1.9.4-2.7.8-.8.5-1.3 1-1.4 1.5s0 1.1.3 1.7c.3.6.8 1.2 1.5 1.8.7.6 1.4 1.2 2.2 1.7.8.5 1.6 1.1 2.4 1.5s1.5.9 2.1 1.2c.7.7 1.9 1.4 3.3 2.2zM232.2 268.3l7.4 4.3-6.6 3.8-7.4-4.3 6.6-3.8zM218.6 255.5c-1.7-1.6-2.7-3.1-3.1-4.4-.4-1.3-.2-2.6.5-3.6s1.8-2 3.2-2.9c1.5-.9 3.2-1.5 5-1.9s4-.5 6.3-.3 4.9.8 7.7 1.8 5.8 2.4 9.1 4.3c3.4 1.9 5.9 3.7 7.6 5.4 1.7 1.6 2.7 3.1 3.1 4.5.4 1.4.2 2.6-.5 3.6-.7 1.1-1.8 2-3.3 2.9-1.4.8-3.1 1.5-5 1.9s-4 .5-6.3.3-4.9-.8-7.7-1.8-5.9-2.4-9.3-4.4c-3.2-2-5.7-3.7-7.3-5.4zm16.9 3.9c1.4.8 2.9 1.4 4.5 2 1.6.6 3.1.9 4.7 1.1 1.5.2 2.9-.1 4.1-.8 1.2-.7 1.7-1.5 1.5-2.4-.2-.9-.9-1.8-1.8-2.7-1-.9-2.1-1.8-3.4-2.6-1.3-.8-2.4-1.5-3.4-2.1-.6-.3-1.3-.7-2.1-1.2s-1.7-.9-2.7-1.4c-1-.4-2-.9-3-1.2-1-.4-2.1-.7-3.1-.9-1-.2-2-.2-3-.2-1 .1-1.9.4-2.7.8-.8.5-1.3 1-1.4 1.5-.1.6 0 1.1.3 1.7s.8 1.2 1.5 1.8 1.4 1.2 2.2 1.7 1.6 1.1 2.4 1.5c.8.5 1.5.9 2.1 1.2.7.7 1.9 1.4 3.3 2.2z"/>
  </g>
  <path fill="#005FAD" d="M671.6 291.8V280h-293v11.8l146.5 84.5z"/>
  <path fill="#0071CE" d="M671.6 280l-146.5-84.6L378.6 280l146.5 84.5z"/>
  <g fill="#2D536D">
    <path d="M484.5 319.5l-32.3-10.1 6.2-3.6L480 313h.1l-12.5-12.5 5.9-3.4 17.6 18.6-6.6 3.8zM509.1 305.3l-21.9-12.6-7.3 4.2-5.2-3c1.1-.6 2-1.2 2.7-1.9.8-.7 1.2-1.4 1.5-2.1s.2-1.5-.2-2.3c-.3-.8-1.1-1.6-2.2-2.5l4.7-2.7 33.7 19.5-5.8 3.4zM523.5 288.4l7.4 4.3-6.6 3.8-7.4-4.3 6.6-3.8zM509.9 275.6c-1.7-1.6-2.7-3.1-3.1-4.4-.4-1.3-.2-2.6.5-3.6.7-1.1 1.8-2 3.2-2.9 1.5-.9 3.2-1.5 5-1.9 1.9-.4 4-.5 6.3-.3s4.9.8 7.7 1.8 5.8 2.4 9.1 4.3c3.4 1.9 5.9 3.7 7.6 5.4 1.7 1.6 2.7 3.1 3.1 4.5.4 1.3.2 2.6-.5 3.6-.7 1.1-1.8 2-3.3 2.9-1.4.8-3.1 1.5-5 1.9-1.9.4-4 .5-6.3.3s-4.9-.8-7.7-1.8-5.9-2.4-9.3-4.4c-3.2-2-5.7-3.7-7.3-5.4zm16.9 3.9c1.4.8 2.9 1.4 4.5 2 1.6.6 3.1.9 4.7 1.1 1.5.2 2.9-.1 4.1-.8 1.2-.7 1.7-1.5 1.5-2.4-.2-.9-.9-1.8-1.8-2.7-1-.9-2.1-1.8-3.4-2.6-1.3-.8-2.4-1.5-3.4-2.1-.6-.3-1.3-.7-2.1-1.2s-1.7-.9-2.7-1.4c-1-.4-2-.9-3-1.2-1-.4-2.1-.7-3.1-.9-1-.2-2-.2-3-.2-1 .1-1.9.4-2.7.8-.8.5-1.3 1-1.4 1.5s0 1.1.3 1.7c.3.6.8 1.2 1.5 1.8.7.6 1.4 1.2 2.2 1.7.8.5 1.6 1.1 2.4 1.5s1.5.9 2.1 1.2c.7.7 1.9 1.4 3.3 2.2zM558.3 268.3l7.4 4.3-6.6 3.8-7.4-4.3 6.6-3.8zM544.7 255.5c-1.7-1.6-2.7-3.1-3.1-4.4-.4-1.3-.2-2.6.5-3.6s1.8-2 3.2-2.9c1.5-.9 3.2-1.5 5-1.9s4-.5 6.3-.3 4.9.8 7.7 1.8 5.8 2.4 9.1 4.3c3.4 1.9 5.9 3.7 7.6 5.4 1.7 1.6 2.7 3.1 3.1 4.5.4 1.4.2 2.6-.5 3.6-.7 1.1-1.8 2-3.3 2.9-1.4.8-3.1 1.5-5 1.9s-4 .5-6.3.3-4.9-.8-7.7-1.8-5.9-2.4-9.3-4.4c-3.2-2-5.6-3.7-7.3-5.4zm16.9 3.9c1.4.8 2.9 1.4 4.5 2 1.6.6 3.1.9 4.7 1.1 1.5.2 2.9-.1 4.1-.8 1.2-.7 1.7-1.5 1.5-2.4-.2-.9-.9-1.8-1.8-2.7-1-.9-2.1-1.8-3.4-2.6-1.3-.8-2.4-1.5-3.4-2.1-.6-.3-1.3-.7-2.1-1.2s-1.7-.9-2.7-1.4c-1-.4-2-.9-3-1.2-1-.4-2.1-.7-3.1-.9-1-.2-2-.2-3-.2-1 .1-1.9.4-2.7.8-.8.5-1.3 1-1.4 1.5-.1.6 0 1.1.3 1.7s.8 1.2 1.5 1.8 1.4 1.2 2.2 1.7 1.6 1.1 2.4 1.5c.8.5 1.5.9 2.1 1.2.7.7 1.9 1.4 3.3 2.2z"/>
  </g>
  <g id="layers-animejs-v2-left">
    <path fill="#BF534F" d="M345.8 209.6v-11.8h-293v11.8l146.5 84.6z"/>
    <path fill="#FF6D68" d="M345.5 197.8L199 113.2 52.5 197.8 199 282.4z"/>
    <g fill="#933131">
      <path d="M163.7 232.8l-32.3-10.1 6.2-3.6 21.6 7.2h.1l-12.5-12.5 5.9-3.4 17.6 18.6-6.6 3.8zM153.8 208.4c-1.2-1.2-2-2.4-2.3-3.7-.3-1.2-.2-2.4.5-3.6.7-1.2 1.9-2.3 3.6-3.3 1.3-.8 2.9-1.4 4.5-1.8 1.7-.4 3.4-.6 5.3-.6s3.7.2 5.5.7c1.9.4 3.6 1.1 5.2 2.1 1.7 1 2.9 2 3.7 2.9.7 1 1.2 2 1.4 3s.1 2-.1 3-.4 2-.7 3c-.2 1-.4 2-.5 3.1-.1 1 .1 2.1.5 3.2l13.8-8 5.9 3.4-21.5 12.4c-2-1.1-3.4-2.3-4.4-3.4-1-1.1-1.6-2.2-1.9-3.4-.3-1.1-.4-2.3-.2-3.5.2-1.2.4-2.5.6-3.8.1-.7.3-1.4.5-2.1.2-.7.3-1.4.2-2.2 0-.7-.3-1.4-.7-2.1-.4-.7-1.1-1.3-2.1-1.9-1.6-.9-3.3-1.4-5.1-1.5-1.7-.1-3.2.3-4.5 1-.9.5-1.4 1.1-1.5 1.7-.1.6 0 1.2.4 1.9s1 1.3 1.7 1.9c.8.6 1.6 1.2 2.5 1.7l-5.7 3.3c-1.8-1.1-3.4-2.2-4.6-3.4zM202.7 201.8l7.4 4.3-6.6 3.8-7.4-4.3 6.6-3.8zM189.1 189c-1.7-1.6-2.7-3.1-3.1-4.4-.4-1.3-.2-2.6.5-3.6s1.8-2 3.2-2.9c1.5-.9 3.1-1.5 5-1.9 1.9-.4 4-.5 6.3-.3s4.9.8 7.7 1.8 5.8 2.4 9.1 4.3c3.4 1.9 5.9 3.7 7.6 5.4 1.7 1.6 2.7 3.1 3.1 4.5.4 1.3.2 2.6-.5 3.6-.7 1.1-1.8 2-3.3 2.9-1.4.8-3.1 1.5-5 1.9-1.9.4-4 .5-6.3.3s-4.9-.8-7.7-1.8-5.9-2.4-9.3-4.4c-3.2-2-5.6-3.8-7.3-5.4zm16.9 3.8c1.4.8 2.9 1.4 4.5 2 1.6.6 3.1.9 4.7 1.1 1.5.1 2.9-.1 4.1-.8 1.2-.7 1.7-1.5 1.5-2.4-.2-.9-.9-1.8-1.8-2.7-1-.9-2.1-1.8-3.4-2.6s-2.4-1.5-3.4-2.1c-.6-.3-1.3-.7-2.1-1.2s-1.7-.9-2.7-1.4c-1-.4-2-.9-3-1.2-1-.4-2.1-.7-3.1-.9-1-.2-2-.2-3-.2-1 .1-1.9.4-2.7.8-.8.5-1.3 1-1.4 1.5s0 1.1.3 1.7c.3.6.8 1.2 1.5 1.8.7.6 1.4 1.2 2.2 1.7.8.5 1.6 1.1 2.4 1.5s1.5.9 2.1 1.2c.7.8 1.9 1.5 3.3 2.2zM237.5 181.7l7.4 4.3-6.6 3.8-7.4-4.3 6.6-3.8zM223.9 168.9c-1.7-1.6-2.7-3.1-3.1-4.4-.4-1.3-.2-2.6.5-3.6s1.8-2 3.2-2.9c1.5-.9 3.2-1.5 5-1.9s4-.5 6.3-.3 4.9.8 7.7 1.8 5.8 2.4 9.1 4.3c3.4 1.9 5.9 3.7 7.6 5.4 1.7 1.6 2.7 3.1 3.1 4.5.4 1.4.2 2.6-.5 3.6-.7 1.1-1.8 2-3.3 2.9-1.4.8-3.1 1.5-5 1.9-1.9.4-4 .5-6.3.3s-4.9-.8-7.7-1.8-5.9-2.4-9.3-4.4c-3.2-2-5.6-3.8-7.3-5.4zm16.9 3.8c1.4.8 2.9 1.4 4.5 2 1.6.6 3.1.9 4.7 1.1 1.5.1 2.9-.1 4.1-.8 1.2-.7 1.7-1.5 1.5-2.4-.2-.9-.9-1.8-1.8-2.7-1-.9-2.1-1.8-3.4-2.6-1.3-.8-2.4-1.5-3.4-2.1-.6-.3-1.3-.7-2.1-1.2s-1.7-.9-2.7-1.4c-1-.4-2-.9-3-1.2-1-.4-2.1-.7-3.1-.9-1-.2-2-.2-3-.2-1 .1-1.9.4-2.7.8-.8.5-1.3 1-1.4 1.5-.1.6 0 1.1.3 1.7.3.6.8 1.2 1.5 1.8.7.6 1.4 1.2 2.2 1.7.8.5 1.6 1.1 2.4 1.5.8.5 1.5.9 2.1 1.2.7.8 1.9 1.5 3.3 2.2z"/>
    </g>
  </g>
  <g id="layers-animejs-v2-right">
    <path fill="#BF534F" d="M671.6 209.6v-11.8h-293v11.8l146.5 84.6z"/>
    <path fill="#FF6D68" d="M671.4 197.8l-146.5-84.6-146.5 84.6 146.5 84.6z"/>
    <g fill="#933131">
      <path d="M489.6 232.8l-32.3-10.1 6.2-3.6 21.6 7.2h.1l-12.5-12.5 5.9-3.4 17.6 18.6-6.6 3.8zM479.7 208.4c-1.2-1.2-2-2.4-2.3-3.7-.3-1.2-.2-2.4.5-3.6.7-1.2 1.9-2.3 3.6-3.3 1.3-.8 2.9-1.4 4.5-1.8 1.7-.4 3.4-.6 5.3-.6s3.7.2 5.5.7c1.9.4 3.6 1.1 5.2 2.1 1.7 1 2.9 2 3.7 2.9.7 1 1.2 2 1.4 3s.1 2-.1 3-.4 2-.7 3c-.2 1-.4 2-.5 3.1-.1 1 .1 2.1.5 3.2l13.8-8 5.9 3.4-21.5 12.4c-2-1.1-3.4-2.3-4.4-3.4-1-1.1-1.6-2.2-1.9-3.4-.3-1.1-.4-2.3-.2-3.5.2-1.2.4-2.5.6-3.8.1-.7.3-1.4.5-2.1.2-.7.3-1.4.2-2.2 0-.7-.3-1.4-.7-2.1-.4-.7-1.1-1.3-2.1-1.9-1.6-.9-3.3-1.4-5.1-1.5-1.7-.1-3.2.3-4.5 1-.9.5-1.4 1.1-1.5 1.7-.1.6 0 1.2.4 1.9s1 1.3 1.7 1.9 1.6 1.2 2.5 1.7l-5.7 3.3c-1.8-1.1-3.4-2.2-4.6-3.4zM528.5 201.8l7.4 4.3-6.6 3.8-7.4-4.3 6.6-3.8zM515 189c-1.7-1.6-2.7-3.1-3.1-4.4-.4-1.3-.2-2.6.5-3.6.7-1.1 1.8-2 3.2-2.9 1.5-.9 3.2-1.5 5-1.9 1.9-.4 4-.5 6.3-.3s4.9.8 7.7 1.8 5.8 2.4 9.1 4.3c3.4 1.9 5.9 3.7 7.6 5.4 1.7 1.6 2.7 3.1 3.1 4.5.4 1.3.2 2.6-.5 3.6-.7 1.1-1.8 2-3.3 2.9-1.4.8-3.1 1.5-5 1.9-1.9.4-4 .5-6.3.3s-4.9-.8-7.7-1.8-5.9-2.4-9.3-4.4c-3.2-2-5.7-3.8-7.3-5.4zm16.9 3.8c1.4.8 2.9 1.4 4.5 2 1.6.6 3.1.9 4.7 1.1 1.5.1 2.9-.1 4.1-.8 1.2-.7 1.7-1.5 1.5-2.4-.2-.9-.9-1.8-1.8-2.7-1-.9-2.1-1.8-3.4-2.6s-2.4-1.5-3.4-2.1c-.6-.3-1.3-.7-2.1-1.2s-1.7-.9-2.7-1.4c-1-.4-2-.9-3-1.2-1-.4-2.1-.7-3.1-.9-1-.2-2-.2-3-.2-1 .1-1.9.4-2.7.8-.8.5-1.3 1-1.4 1.5s0 1.1.3 1.7c.3.6.8 1.2 1.5 1.8.7.6 1.4 1.2 2.2 1.7.8.5 1.6 1.1 2.4 1.5s1.5.9 2.1 1.2c.7.8 1.9 1.5 3.3 2.2zM563.4 181.7l7.4 4.3-6.6 3.8-7.4-4.3 6.6-3.8zM549.8 168.9c-1.7-1.6-2.7-3.1-3.1-4.4-.4-1.3-.2-2.6.5-3.6s1.8-2 3.2-2.9c1.5-.9 3.2-1.5 5-1.9s4-.5 6.3-.3 4.9.8 7.7 1.8 5.8 2.4 9.1 4.3c3.4 1.9 5.9 3.7 7.6 5.4 1.7 1.6 2.7 3.1 3.1 4.5.4 1.4.2 2.6-.5 3.6-.7 1.1-1.8 2-3.3 2.9-1.4.8-3.1 1.5-5 1.9s-4 .5-6.3.3-4.9-.8-7.7-1.8-5.9-2.4-9.3-4.4c-3.2-2-5.7-3.8-7.3-5.4zm16.9 3.8c1.4.8 2.9 1.4 4.5 2 1.6.6 3.1.9 4.7 1.1 1.5.1 2.9-.1 4.1-.8 1.2-.7 1.7-1.5 1.5-2.4-.2-.9-.9-1.8-1.8-2.7-1-.9-2.1-1.8-3.4-2.6-1.3-.8-2.4-1.5-3.4-2.1-.6-.3-1.3-.7-2.1-1.2s-1.7-.9-2.7-1.4c-1-.4-2-.9-3-1.2-1-.4-2.1-.7-3.1-.9-1-.2-2-.2-3-.2-1 .1-1.9.4-2.7.8-.8.5-1.3 1-1.4 1.5-.1.6 0 1.1.3 1.7.3.6.8 1.2 1.5 1.8.7.6 1.4 1.2 2.2 1.7.8.5 1.6 1.1 2.4 1.5.8.5 1.5.9 2.1 1.2.7.8 1.9 1.5 3.3 2.2z"/>
    </g>
  </g>
  <g id="layers-animejs-v3-left">
    <path fill="#E0B03B" d="M345.9 161.4v-11.8h-293v11.8L199.4 246z"/>
    <path fill="#FFC843" d="M345.6 149.6L199.1 65.1 52.6 149.6l146.5 84.6z"/>
    <g fill="#A58234">
      <path d="M163.7 187.3l-32.3-10.1 6.2-3.6 21.6 7.2h.1l-12.5-12.5 5.9-3.4 17.6 18.6-6.6 3.8zM169.3 160.9c.7-.5 1.2-1 1.5-1.5.3-.5.4-1.1.2-1.7s-.7-1.1-1.7-1.7c-1.4-.8-3-1.2-4.6-1.2-1.6 0-3 .4-4 1-1.5.9-2.1 1.9-1.7 3 .4 1.1 1.4 2.1 3.2 3.1l-5.6 3.3c-1.7-1-3-2.1-3.9-3.2-.9-1.1-1.5-2.2-1.6-3.3-.2-1.1.1-2.2.8-3.2.7-1 1.7-2 3.2-2.8 1.2-.7 2.5-1.2 4.1-1.7 1.6-.4 3.2-.7 5-.8 1.7-.1 3.5.1 5.2.4 1.7.3 3.4.9 4.9 1.8 1.6.9 2.7 2 3.3 3.1.6 1.1.4 2.2-.5 3.2l.1.1c2-.7 4.2-.9 6.5-.6 2.3.3 4.4 1 6.3 2.1 1.8 1 3 2.1 3.8 3.2.8 1.1 1.1 2.3 1.1 3.4-.1 1.1-.5 2.2-1.3 3.2s-1.9 2-3.4 2.8c-1.6.9-3.4 1.7-5.3 2.1-1.9.5-3.8.7-5.8.6-2-.1-4-.4-6-.9-2-.6-4-1.4-5.9-2.6l5.6-3.3c.9.5 1.9.9 3 1.3 1 .3 2.1.6 3.1.7 1 .1 2 .1 3-.1s1.9-.5 2.8-1c1.3-.8 2-1.7 2-2.8 0-1.1-.9-2.1-2.5-3-1.3-.7-2.5-1.2-3.6-1.3-1.1-.1-2.1-.1-3.1.1s-1.9.5-2.7 1c-.8.4-1.6.9-2.3 1.3l-4.8-2.8c.2-.5.9-.9 1.6-1.3zM202.7 156.2l7.4 4.3-6.6 3.8-7.4-4.3 6.6-3.8zM189.1 143.5c-1.7-1.6-2.7-3.1-3.1-4.4-.4-1.3-.2-2.6.5-3.6s1.8-2 3.2-2.9c1.5-.9 3.1-1.5 5-1.9 1.9-.4 4-.5 6.3-.3s4.9.8 7.7 1.8 5.8 2.4 9.1 4.3c3.4 1.9 5.9 3.7 7.6 5.4 1.7 1.6 2.7 3.1 3.1 4.5.4 1.3.2 2.6-.5 3.6-.7 1.1-1.8 2-3.3 2.9-1.4.8-3.1 1.5-5 1.9-1.9.4-4 .5-6.3.3s-4.9-.8-7.7-1.8-5.9-2.4-9.3-4.4c-3.2-2.1-5.6-3.8-7.3-5.4zm16.9 3.8c1.4.8 2.9 1.4 4.5 2 1.6.6 3.1.9 4.7 1.1 1.5.1 2.9-.1 4.1-.8 1.2-.7 1.7-1.5 1.5-2.4-.2-.9-.9-1.8-1.8-2.7-1-.9-2.1-1.8-3.4-2.6s-2.4-1.5-3.4-2.1c-.6-.3-1.3-.7-2.1-1.2s-1.7-.9-2.7-1.4c-1-.4-2-.9-3-1.2-1-.4-2.1-.7-3.1-.9-1-.2-2-.2-3-.2-1 .1-1.9.4-2.7.8-.8.5-1.3 1-1.4 1.5s0 1.1.3 1.7c.3.6.8 1.2 1.5 1.8.7.6 1.4 1.2 2.2 1.7.8.5 1.6 1.1 2.4 1.5s1.5.9 2.1 1.2c.7.8 1.9 1.4 3.3 2.2zM237.5 136.1l7.4 4.3-6.6 3.8-7.4-4.3 6.6-3.8zM223.9 123.4c-1.7-1.6-2.7-3.1-3.1-4.4-.4-1.3-.2-2.6.5-3.6s1.8-2 3.2-2.9c1.5-.9 3.2-1.5 5-1.9s4-.5 6.3-.3 4.9.8 7.7 1.8 5.8 2.4 9.1 4.3c3.4 1.9 5.9 3.7 7.6 5.4 1.7 1.6 2.7 3.1 3.1 4.5.4 1.4.2 2.6-.5 3.6-.7 1.1-1.8 2-3.3 2.9-1.4.8-3.1 1.5-5 1.9-1.9.4-4 .5-6.3.3s-4.9-.8-7.7-1.8-5.9-2.4-9.3-4.4c-3.2-2.1-5.6-3.8-7.3-5.4zm16.9 3.8c1.4.8 2.9 1.4 4.5 2 1.6.6 3.1.9 4.7 1.1 1.5.1 2.9-.1 4.1-.8 1.2-.7 1.7-1.5 1.5-2.4-.2-.9-.9-1.8-1.8-2.7-1-.9-2.1-1.8-3.4-2.6-1.3-.8-2.4-1.5-3.4-2.1-.6-.3-1.3-.7-2.1-1.2s-1.7-.9-2.7-1.4c-1-.4-2-.9-3-1.2-1-.4-2.1-.7-3.1-.9-1-.2-2-.2-3-.2-1 .1-1.9.4-2.7.8-.8.5-1.3 1-1.4 1.5-.1.6 0 1.1.3 1.7.3.6.8 1.2 1.5 1.8.7.6 1.4 1.2 2.2 1.7.8.5 1.6 1.1 2.4 1.5.8.5 1.5.9 2.1 1.2.7.8 1.9 1.4 3.3 2.2z"/>
    </g>
  </g>
</svg>
<script src="anime.min.js"></script>
<script src="isScrolledIntoView.js"></script>
<script>
(function() {
  const svg = document.querySelector('#layers')
  const wrapper = document.createElement('div')
  wrapper.classList = 'relative'
  const restart = document.createElement('div')
  restart.classList = 'restart'
  restart.innerHTML = '<span>Restart</span>'
  wrap(svg, wrapper)
  wrapper.appendChild(restart)
  const basicTimeline = anime.timeline({
    autoplay: false,
  });
  basicTimeline
  .add({
    begin: function() {
      wrapper.onclick = function() {}
      restart.classList.add('inactive')
    }
  })
  .add({
    targets: ['#layers-animejs-v2-left', '#layers-animejs-v2-right'],
    translateY: [-50, 70],
    opacity: [0, 1],
  easing: 'easeInExpo',
  })
  .add({
    targets: '#layers-animejs-v3-left',
    translateY: [-50, 106],
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({})
  .add({
    targets: '#layers-animejs-v3-left',
    translateY: [106, 106],
    translateX: [0, 326],
    easing: 'easeOutExpo',
  })
  .add({
    complete: function() {
      wrapper.onclick = basicTimeline.restart
      restart.classList.remove('inactive')
    }
  })
  wrapper.onclick = basicTimeline.restart
  onScrollIntoView(svg, function() {
    setTimeout(basicTimeline.play, 1000)
  });
  function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }
})();
</script>
```

When the delta is received, the new package is recomputed from the diff, unzipped and run as a separate process.

Linux containers and Kubernetes are an excellent platform to run applications on your internet of things.

In fact, installing Kubernetes in your solar plant lets you benefit from:

- a centralised scheduler to issue deployments
- secure and encrypted updates delivered as containers
- a proven technology able to scale to thousands of devices

_So what happens when a solar panel breaks?_

## Resilience and failover in Kubernetes

Kubernetes continually watches your infrastructure for failing processes and agents.

When a device fails, Kubernetes will reschedule all of the applications deployed on that computer to another.

```include
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 644" id="reschedule">
  <g fill="none" fill-rule="evenodd">
    <g transform="translate(512 113)">
      <g>
        <path fill="#7C7C7C" d="M196,364.611638 L196,394.804699 C196,396.472216 194.979626,397.824005 193.72093,397.824005 L2.27906963,397.824005 C1.02037423,397.824005 1.54145729e-16,396.472216 0,394.804699 L0,364.611638 C-1.54145729e-16,362.944121 1.02037423,361.592331 2.27906963,361.592331 L193.72093,361.592331 C194.979626,361.592331 196,362.944121 196,364.611638 Z"/>
        <g transform="translate(8.38 371.073)">
          <polygon fill="#D8D8D8" points="30.997 0 142.007 0 142.007 4.314 30.997 4.314"/>
          <polygon fill="#D7D7D7" points="7.741 0 12.042 0 12.042 4.301 7.741 4.301"/>
          <polygon fill="#D7D7D7" points="0 0 4.301 0 4.301 4.301 0 4.301"/>
          <polygon fill="#00CD00" points="166.6 0 170.901 0 170.901 4.301 166.6 4.301"/>
          <polygon fill="#D7D400" points="159.6 0 163.901 0 163.901 4.301 159.6 4.301"/>
          <polygon fill="#FF3C00" points="152.6 0 156.901 0 156.901 4.301 152.6 4.301"/>
          <polygon fill="#00CD00" points="173.6 0 177.901 0 177.901 4.301 173.6 4.301"/>
        </g>
        <g transform="translate(8.38 378.621)">
          <polygon fill="#D8D8D8" points="30.997 0 142.007 0 142.007 4.314 30.997 4.314"/>
          <polygon fill="#D7D7D7" points="7.741 0 12.042 0 12.042 4.301 7.741 4.301"/>
          <polygon fill="#D7D7D7" points="0 0 4.301 0 4.301 4.301 0 4.301"/>
          <polygon fill="#00CD00" points="166.6 0 170.901 0 170.901 4.301 166.6 4.301"/>
          <polygon fill="#D7D400" points="159.6 0 163.901 0 163.901 4.301 159.6 4.301"/>
          <polygon fill="#FF3C00" points="152.6 0 156.901 0 156.901 4.301 152.6 4.301"/>
          <polygon fill="#00CD00" points="173.6 0 177.901 0 177.901 4.301 173.6 4.301"/>
        </g>
        <g transform="translate(8.38 386.17)">
          <polygon fill="#D8D8D8" points="30.997 0 142.007 0 142.007 4.314 30.997 4.314"/>
          <polygon fill="#D7D7D7" points="7.741 0 12.042 0 12.042 4.301 7.741 4.301"/>
          <polygon fill="#D7D7D7" points="0 0 4.301 0 4.301 4.301 0 4.301"/>
          <polygon fill="#00CD00" points="166.6 0 170.901 0 170.901 4.301 166.6 4.301"/>
          <polygon fill="#D7D400" points="159.6 0 163.901 0 163.901 4.301 159.6 4.301"/>
          <polygon fill="#FF3C00" points="152.6 0 156.901 0 156.901 4.301 152.6 4.301"/>
          <polygon fill="#00CD00" points="173.6 0 177.901 0 177.901 4.301 173.6 4.301"/>
        </g>
        <path fill="#7C7C7C" d="M196,3.22559985 L196,354.170863 C196,355.952313 194.979626,357.396463 193.72093,357.396463 L2.27906963,357.396463 C1.02037423,357.396463 1.54145729e-16,355.952313 0,354.170863 L0,3.22559985 C-1.54145729e-16,1.44415024 1.02037423,3.27246984e-16 2.27906963,0 L193.72093,0 C194.979626,1.70774491e-14 196,1.44415024 196,3.22559985 Z"/>
        <polygon fill="#D7D7D7" points="9.462 344.494 187.276 344.494 187.276 348.795 9.462 348.795"/>
        <polygon fill="#D7D7D7" points="8.387 23.224 186.206 23.224 186.206 27.525 8.387 27.525"/>
        <polygon fill="#D7D7D7" points="8.387 15.483 186.206 15.483 186.206 19.784 8.387 19.784"/>
        <polygon fill="#D7D7D7" points="8.387 7.741 186.206 7.741 186.206 12.042 8.387 12.042"/>
        <path fill="#FFF" d="M9.26075979,36.2335114 L185.319705,36.2335114 C185.805879,36.2335114 186.2,36.8128791 186.2,37.5275653 L186.2,335.15998 C186.2,335.874666 185.805879,336.454034 185.319705,336.454034 L9.26075979,336.454034 C8.77458647,336.454034 8.38046512,335.874666 8.38046512,335.15998 L8.38046512,37.5275653 C8.38046512,36.8128791 8.77458647,36.2335114 9.26075979,36.2335114 Z"/>
      </g>
      <g id="reschedule-animejs-app4" transform="translate(19 47)">
        <g transform="translate(.6 .6)">
          <path fill="#00C176" d="M155.231996,131.223855 C155.231996,132.052078 154.745952,132.723357 154.146147,132.723357 L1.08584878,132.723357 C0.486044752,132.723357 0,132.052078 0,131.223855 L4.4408921e-16,3.88079991 C1.81609852e-16,1.7374933 1.7374933,4.83461113e-15 3.88079991,4.4408921e-15 L151.351196,4.4408921e-16 C153.494503,-1.51787392e-14 155.231996,1.7374933 155.231996,3.88079991 L155.231996,131.223855 Z"/>
          <text fill="#FFF" font-size="26.389" font-weight="bold" class="sans-serif">
            <tspan x="50.486" y="84.54">APP</tspan>
          </text>
          <path fill="#CCC" d="M3.88079991,0 L151.351196,0 C153.494503,-3.93719036e-16 155.231996,1.7374933 155.231996,3.88079991 L155.231996,17.8516796 L0,17.8516796 L0,3.88079991 C-2.62479357e-16,1.7374933 1.7374933,-9.38548593e-16 3.88079991,-1.33226763e-15 Z"/>
          <path fill="#E74C3C" d="M13.1947197,9.70199977 C13.1947197,11.6311916 11.6311916,13.1947197 9.70199977,13.1947197 C7.7728079,13.1947197 6.20927985,11.6311916 6.20927985,9.70199977 C6.20927985,7.7728079 7.7728079,6.20927985 9.70199977,6.20927985 C11.6311916,6.20927985 13.1947197,7.7728079 13.1947197,9.70199977"/>
          <path fill="#F1C40F" d="M25.6132794,9.70199977 C25.6132794,11.6311916 24.0497513,13.1947197 22.1205595,13.1947197 C20.1913676,13.1947197 18.6278396,11.6311916 18.6278396,9.70199977 C18.6278396,7.7728079 20.1913676,6.20927985 22.1205595,6.20927985 C24.0497513,6.20927985 25.6132794,7.7728079 25.6132794,9.70199977"/>
          <path fill="#2ECC71" d="M37.2556791,9.70199977 C37.2556791,11.6311916 35.6921511,13.1947197 33.7629592,13.1947197 C31.8337673,13.1947197 30.2702393,11.6311916 30.2702393,9.70199977 C30.2702393,7.7728079 31.8337673,6.20927985 33.7629592,6.20927985 C35.6921511,6.20927985 37.2556791,7.7728079 37.2556791,9.70199977"/>
        </g>
      </g>
      <g id="reschedule-animejs-app5" transform="translate(20 190)">
        <g>
          <path fill="#00C176" d="M155.231996,131.223855 C155.231996,132.052078 154.745952,132.723357 154.146147,132.723357 L1.08584878,132.723357 C0.486044752,132.723357 0,132.052078 0,131.223855 L4.4408921e-16,3.88079991 C1.81609852e-16,1.7374933 1.7374933,4.83461113e-15 3.88079991,4.4408921e-15 L151.351196,4.4408921e-16 C153.494503,-1.51787392e-14 155.231996,1.7374933 155.231996,3.88079991 L155.231996,131.223855 Z"/>
          <text fill="#FFF" font-size="26.389" font-weight="bold" class="sans-serif">
            <tspan x="50.486" y="84.54">APP</tspan>
          </text>
          <path fill="#CCC" d="M3.88079991,0 L151.351196,0 C153.494503,-3.93719036e-16 155.231996,1.7374933 155.231996,3.88079991 L155.231996,17.8516796 L0,17.8516796 L0,3.88079991 C-2.62479357e-16,1.7374933 1.7374933,-9.38548593e-16 3.88079991,-1.33226763e-15 Z"/>
          <path fill="#E74C3C" d="M13.1947197,9.70199977 C13.1947197,11.6311916 11.6311916,13.1947197 9.70199977,13.1947197 C7.7728079,13.1947197 6.20927985,11.6311916 6.20927985,9.70199977 C6.20927985,7.7728079 7.7728079,6.20927985 9.70199977,6.20927985 C11.6311916,6.20927985 13.1947197,7.7728079 13.1947197,9.70199977"/>
          <path fill="#F1C40F" d="M25.6132794,9.70199977 C25.6132794,11.6311916 24.0497513,13.1947197 22.1205595,13.1947197 C20.1913676,13.1947197 18.6278396,11.6311916 18.6278396,9.70199977 C18.6278396,7.7728079 20.1913676,6.20927985 22.1205595,6.20927985 C24.0497513,6.20927985 25.6132794,7.7728079 25.6132794,9.70199977"/>
          <path fill="#2ECC71" d="M37.2556791,9.70199977 C37.2556791,11.6311916 35.6921511,13.1947197 33.7629592,13.1947197 C31.8337673,13.1947197 30.2702393,11.6311916 30.2702393,9.70199977 C30.2702393,7.7728079 31.8337673,6.20927985 33.7629592,6.20927985 C35.6921511,6.20927985 37.2556791,7.7728079 37.2556791,9.70199977"/>
        </g>
      </g>
    </g>
    <g id="reschedule-animejs-server" transform="translate(302 113)">
      <g>
        <path fill="#7C7C7C" d="M196,364.611638 L196,394.804699 C196,396.472216 194.979626,397.824005 193.72093,397.824005 L2.27906963,397.824005 C1.02037423,397.824005 1.54145729e-16,396.472216 0,394.804699 L0,364.611638 C-1.54145729e-16,362.944121 1.02037423,361.592331 2.27906963,361.592331 L193.72093,361.592331 C194.979626,361.592331 196,362.944121 196,364.611638 Z"/>
        <g transform="translate(8.38 371.073)">
          <polygon fill="#D8D8D8" points="30.997 0 142.007 0 142.007 4.314 30.997 4.314"/>
          <polygon fill="#D7D7D7" points="7.741 0 12.042 0 12.042 4.301 7.741 4.301"/>
          <polygon fill="#D7D7D7" points="0 0 4.301 0 4.301 4.301 0 4.301"/>
          <polygon fill="#00CD00" points="166.6 0 170.901 0 170.901 4.301 166.6 4.301"/>
          <polygon fill="#D7D400" points="159.6 0 163.901 0 163.901 4.301 159.6 4.301"/>
          <polygon fill="#FF3C00" points="152.6 0 156.901 0 156.901 4.301 152.6 4.301"/>
          <polygon fill="#00CD00" points="173.6 0 177.901 0 177.901 4.301 173.6 4.301"/>
        </g>
        <g transform="translate(8.38 378.621)">
          <polygon fill="#D8D8D8" points="30.997 0 142.007 0 142.007 4.314 30.997 4.314"/>
          <polygon fill="#D7D7D7" points="7.741 0 12.042 0 12.042 4.301 7.741 4.301"/>
          <polygon fill="#D7D7D7" points="0 0 4.301 0 4.301 4.301 0 4.301"/>
          <polygon fill="#00CD00" points="166.6 0 170.901 0 170.901 4.301 166.6 4.301"/>
          <polygon fill="#D7D400" points="159.6 0 163.901 0 163.901 4.301 159.6 4.301"/>
          <polygon fill="#FF3C00" points="152.6 0 156.901 0 156.901 4.301 152.6 4.301"/>
          <polygon fill="#00CD00" points="173.6 0 177.901 0 177.901 4.301 173.6 4.301"/>
        </g>
        <g transform="translate(8.38 386.17)">
          <polygon fill="#D8D8D8" points="30.997 0 142.007 0 142.007 4.314 30.997 4.314"/>
          <polygon fill="#D7D7D7" points="7.741 0 12.042 0 12.042 4.301 7.741 4.301"/>
          <polygon fill="#D7D7D7" points="0 0 4.301 0 4.301 4.301 0 4.301"/>
          <polygon fill="#00CD00" points="166.6 0 170.901 0 170.901 4.301 166.6 4.301"/>
          <polygon fill="#D7D400" points="159.6 0 163.901 0 163.901 4.301 159.6 4.301"/>
          <polygon fill="#FF3C00" points="152.6 0 156.901 0 156.901 4.301 152.6 4.301"/>
          <polygon fill="#00CD00" points="173.6 0 177.901 0 177.901 4.301 173.6 4.301"/>
        </g>
        <path fill="#7C7C7C" d="M196,3.22559985 L196,354.170863 C196,355.952313 194.979626,357.396463 193.72093,357.396463 L2.27906963,357.396463 C1.02037423,357.396463 1.54145729e-16,355.952313 0,354.170863 L0,3.22559985 C-1.54145729e-16,1.44415024 1.02037423,3.27246984e-16 2.27906963,0 L193.72093,0 C194.979626,1.70774491e-14 196,1.44415024 196,3.22559985 Z"/>
        <polygon fill="#D7D7D7" points="9.462 344.494 187.276 344.494 187.276 348.795 9.462 348.795"/>
        <polygon fill="#D7D7D7" points="8.387 23.224 186.206 23.224 186.206 27.525 8.387 27.525"/>
        <polygon fill="#D7D7D7" points="8.387 15.483 186.206 15.483 186.206 19.784 8.387 19.784"/>
        <polygon fill="#D7D7D7" points="8.387 7.741 186.206 7.741 186.206 12.042 8.387 12.042"/>
        <path fill="#FFF" d="M9.26075979,36.2335114 L185.319705,36.2335114 C185.805879,36.2335114 186.2,36.8128791 186.2,37.5275653 L186.2,335.15998 C186.2,335.874666 185.805879,336.454034 185.319705,336.454034 L9.26075979,336.454034 C8.77458647,336.454034 8.38046512,335.874666 8.38046512,335.15998 L8.38046512,37.5275653 C8.38046512,36.8128791 8.77458647,36.2335114 9.26075979,36.2335114 Z"/>
      </g>
    </g>
    <g id="reschedule-animejs-app3" transform="translate(321 160)">
      <g transform="translate(.6 .6)">
        <path fill="#00C176" d="M155.231996,131.223855 C155.231996,132.052078 154.745952,132.723357 154.146147,132.723357 L1.08584878,132.723357 C0.486044752,132.723357 0,132.052078 0,131.223855 L4.4408921e-16,3.88079991 C1.81609852e-16,1.7374933 1.7374933,4.83461113e-15 3.88079991,4.4408921e-15 L151.351196,4.4408921e-16 C153.494503,-1.51787392e-14 155.231996,1.7374933 155.231996,3.88079991 L155.231996,131.223855 Z"/>
        <text fill="#FFF" font-size="26.389" font-weight="bold" class="sans-serif">
          <tspan x="50.486" y="84.54">APP</tspan>
        </text>
        <path fill="#CCC" d="M3.88079991,0 L151.351196,0 C153.494503,-3.93719036e-16 155.231996,1.7374933 155.231996,3.88079991 L155.231996,17.8516796 L0,17.8516796 L0,3.88079991 C-2.62479357e-16,1.7374933 1.7374933,-9.38548593e-16 3.88079991,-1.33226763e-15 Z"/>
        <path fill="#E74C3C" d="M13.1947197,9.70199977 C13.1947197,11.6311916 11.6311916,13.1947197 9.70199977,13.1947197 C7.7728079,13.1947197 6.20927985,11.6311916 6.20927985,9.70199977 C6.20927985,7.7728079 7.7728079,6.20927985 9.70199977,6.20927985 C11.6311916,6.20927985 13.1947197,7.7728079 13.1947197,9.70199977"/>
        <path fill="#F1C40F" d="M25.6132794,9.70199977 C25.6132794,11.6311916 24.0497513,13.1947197 22.1205595,13.1947197 C20.1913676,13.1947197 18.6278396,11.6311916 18.6278396,9.70199977 C18.6278396,7.7728079 20.1913676,6.20927985 22.1205595,6.20927985 C24.0497513,6.20927985 25.6132794,7.7728079 25.6132794,9.70199977"/>
        <path fill="#2ECC71" d="M37.2556791,9.70199977 C37.2556791,11.6311916 35.6921511,13.1947197 33.7629592,13.1947197 C31.8337673,13.1947197 30.2702393,11.6311916 30.2702393,9.70199977 C30.2702393,7.7728079 31.8337673,6.20927985 33.7629592,6.20927985 C35.6921511,6.20927985 37.2556791,7.7728079 37.2556791,9.70199977"/>
      </g>
    </g>
    <g id="reschedule-animejs-up2" fill="#00C176" fill-rule="nonzero" transform="translate(457 60)">
      <g>
        <path d="M20.4,0.00012 C31.68,0.00012 40.8,9.12012 40.8,20.40012 C40.8,31.68012 31.68,40.80012 20.4,40.80012 C9.12,40.80012 0,31.68012 0,20.40012 C0,9.12012 9.12,0.00012 20.4,0.00012 Z M21.3,27.12012 L33.06,15.36012 L29.1,11.40012 L17.34,23.16012 L11.76,17.58012 L7.8,21.54012 L13.38,27.12012 L17.34,31.08012 L21.3,27.12012 Z"/>
      </g>
    </g>
    <g id="reschedule-animejs-up1" fill="#00C176" fill-rule="nonzero" transform="translate(247 60)">
      <g>
        <path d="M20.4,0.00012 C31.68,0.00012 40.8,9.12012 40.8,20.40012 C40.8,31.68012 31.68,40.80012 20.4,40.80012 C9.12,40.80012 0,31.68012 0,20.40012 C0,9.12012 9.12,0.00012 20.4,0.00012 Z M21.3,27.12012 L33.06,15.36012 L29.1,11.40012 L17.34,23.16012 L11.76,17.58012 L7.8,21.54012 L13.38,27.12012 L17.34,31.08012 L21.3,27.12012 Z"/>
      </g>
    </g>
    <g id="reschedule-animejs-down" fill="#FF003C" fill-rule="nonzero" transform="translate(457 60)">
      <g>
        <path d="M29.53128,25.84014 L25.84008,29.53134 L20.39988,24.09114 L14.95968,29.53134 L11.26848,25.84014 L16.70868,20.39994 L11.26848,14.95974 L14.95968,11.26854 L20.39988,16.70874 L25.84008,11.26854 L29.53128,14.95974 L24.09168,20.39994 L29.53128,25.84014 Z M34.84248,5.95794 C30.95628,2.13714 25.84008,-6e-05 20.39988,-6e-05 C14.95968,-6e-05 9.77928,2.13714 5.95788,5.95794 C2.13708,9.84354 -0.00012,14.95974 -0.00012,20.39994 C-0.00012,25.84014 2.13708,31.02054 5.95788,34.84194 C9.84348,38.66334 14.95968,40.79994 20.39988,40.79994 C25.84008,40.79994 30.95628,38.66334 34.84248,34.84194 C38.66328,30.95634 40.79988,25.84014 40.79988,20.39994 C40.79988,14.95974 38.66328,9.77874 34.84248,5.95794 Z"/>
      </g>
    </g>
    <g id="reschedule-animejs-up3" fill="#00C176" fill-rule="nonzero" transform="translate(667 60)">
      <g>
        <path d="M20.4,0.00012 C31.68,0.00012 40.8,9.12012 40.8,20.40012 C40.8,31.68012 31.68,40.80012 20.4,40.80012 C9.12,40.80012 0,31.68012 0,20.40012 C0,9.12012 9.12,0.00012 20.4,0.00012 Z M21.3,27.12012 L33.06,15.36012 L29.1,11.40012 L17.34,23.16012 L11.76,17.58012 L7.8,21.54012 L13.38,27.12012 L17.34,31.08012 L21.3,27.12012 Z"/>
      </g>
    </g>
    <g transform="translate(92 113)">
      <g>
        <path fill="#7C7C7C" d="M196,364.611638 L196,394.804699 C196,396.472216 194.979626,397.824005 193.72093,397.824005 L2.27906963,397.824005 C1.02037423,397.824005 1.54145729e-16,396.472216 0,394.804699 L0,364.611638 C-1.54145729e-16,362.944121 1.02037423,361.592331 2.27906963,361.592331 L193.72093,361.592331 C194.979626,361.592331 196,362.944121 196,364.611638 Z"/>
        <g transform="translate(8.38 371.073)">
          <polygon fill="#D8D8D8" points="30.997 0 142.007 0 142.007 4.314 30.997 4.314"/>
          <polygon fill="#D7D7D7" points="7.741 0 12.042 0 12.042 4.301 7.741 4.301"/>
          <polygon fill="#D7D7D7" points="0 0 4.301 0 4.301 4.301 0 4.301"/>
          <polygon fill="#00CD00" points="166.6 0 170.901 0 170.901 4.301 166.6 4.301"/>
          <polygon fill="#D7D400" points="159.6 0 163.901 0 163.901 4.301 159.6 4.301"/>
          <polygon fill="#FF3C00" points="152.6 0 156.901 0 156.901 4.301 152.6 4.301"/>
          <polygon fill="#00CD00" points="173.6 0 177.901 0 177.901 4.301 173.6 4.301"/>
        </g>
        <g transform="translate(8.38 378.621)">
          <polygon fill="#D8D8D8" points="30.997 0 142.007 0 142.007 4.314 30.997 4.314"/>
          <polygon fill="#D7D7D7" points="7.741 0 12.042 0 12.042 4.301 7.741 4.301"/>
          <polygon fill="#D7D7D7" points="0 0 4.301 0 4.301 4.301 0 4.301"/>
          <polygon fill="#00CD00" points="166.6 0 170.901 0 170.901 4.301 166.6 4.301"/>
          <polygon fill="#D7D400" points="159.6 0 163.901 0 163.901 4.301 159.6 4.301"/>
          <polygon fill="#FF3C00" points="152.6 0 156.901 0 156.901 4.301 152.6 4.301"/>
          <polygon fill="#00CD00" points="173.6 0 177.901 0 177.901 4.301 173.6 4.301"/>
        </g>
        <g transform="translate(8.38 386.17)">
          <polygon fill="#D8D8D8" points="30.997 0 142.007 0 142.007 4.314 30.997 4.314"/>
          <polygon fill="#D7D7D7" points="7.741 0 12.042 0 12.042 4.301 7.741 4.301"/>
          <polygon fill="#D7D7D7" points="0 0 4.301 0 4.301 4.301 0 4.301"/>
          <polygon fill="#00CD00" points="166.6 0 170.901 0 170.901 4.301 166.6 4.301"/>
          <polygon fill="#D7D400" points="159.6 0 163.901 0 163.901 4.301 159.6 4.301"/>
          <polygon fill="#FF3C00" points="152.6 0 156.901 0 156.901 4.301 152.6 4.301"/>
          <polygon fill="#00CD00" points="173.6 0 177.901 0 177.901 4.301 173.6 4.301"/>
        </g>
        <path fill="#7C7C7C" d="M196,3.22559985 L196,354.170863 C196,355.952313 194.979626,357.396463 193.72093,357.396463 L2.27906963,357.396463 C1.02037423,357.396463 1.54145729e-16,355.952313 0,354.170863 L0,3.22559985 C-1.54145729e-16,1.44415024 1.02037423,3.27246984e-16 2.27906963,0 L193.72093,0 C194.979626,1.70774491e-14 196,1.44415024 196,3.22559985 Z"/>
        <polygon fill="#D7D7D7" points="9.462 344.494 187.276 344.494 187.276 348.795 9.462 348.795"/>
        <polygon fill="#D7D7D7" points="8.387 23.224 186.206 23.224 186.206 27.525 8.387 27.525"/>
        <polygon fill="#D7D7D7" points="8.387 15.483 186.206 15.483 186.206 19.784 8.387 19.784"/>
        <polygon fill="#D7D7D7" points="8.387 7.741 186.206 7.741 186.206 12.042 8.387 12.042"/>
        <path fill="#FFF" d="M9.26075979,36.2335114 L185.319705,36.2335114 C185.805879,36.2335114 186.2,36.8128791 186.2,37.5275653 L186.2,335.15998 C186.2,335.874666 185.805879,336.454034 185.319705,336.454034 L9.26075979,336.454034 C8.77458647,336.454034 8.38046512,335.874666 8.38046512,335.15998 L8.38046512,37.5275653 C8.38046512,36.8128791 8.77458647,36.2335114 9.26075979,36.2335114 Z"/>
      </g>
      <g id="reschedule-animejs-app2" transform="translate(19 190)">
        <g transform="translate(.6 .4)">
          <path fill="#00C176" d="M155.231996,131.223855 C155.231996,132.052078 154.745952,132.723357 154.146147,132.723357 L1.08584878,132.723357 C0.486044752,132.723357 0,132.052078 0,131.223855 L4.4408921e-16,3.88079991 C1.81609852e-16,1.7374933 1.7374933,4.83461113e-15 3.88079991,4.4408921e-15 L151.351196,4.4408921e-16 C153.494503,-1.51787392e-14 155.231996,1.7374933 155.231996,3.88079991 L155.231996,131.223855 Z"/>
          <text fill="#FFF" font-size="26.389" font-weight="bold" class="sans-serif">
            <tspan x="50.486" y="84.54">APP</tspan>
          </text>
          <path fill="#CCC" d="M3.88079991,0 L151.351196,0 C153.494503,-3.93719036e-16 155.231996,1.7374933 155.231996,3.88079991 L155.231996,17.8516796 L0,17.8516796 L0,3.88079991 C-2.62479357e-16,1.7374933 1.7374933,-9.38548593e-16 3.88079991,-1.33226763e-15 Z"/>
          <path fill="#E74C3C" d="M13.1947197,9.70199977 C13.1947197,11.6311916 11.6311916,13.1947197 9.70199977,13.1947197 C7.7728079,13.1947197 6.20927985,11.6311916 6.20927985,9.70199977 C6.20927985,7.7728079 7.7728079,6.20927985 9.70199977,6.20927985 C11.6311916,6.20927985 13.1947197,7.7728079 13.1947197,9.70199977"/>
          <path fill="#F1C40F" d="M25.6132794,9.70199977 C25.6132794,11.6311916 24.0497513,13.1947197 22.1205595,13.1947197 C20.1913676,13.1947197 18.6278396,11.6311916 18.6278396,9.70199977 C18.6278396,7.7728079 20.1913676,6.20927985 22.1205595,6.20927985 C24.0497513,6.20927985 25.6132794,7.7728079 25.6132794,9.70199977"/>
          <path fill="#2ECC71" d="M37.2556791,9.70199977 C37.2556791,11.6311916 35.6921511,13.1947197 33.7629592,13.1947197 C31.8337673,13.1947197 30.2702393,11.6311916 30.2702393,9.70199977 C30.2702393,7.7728079 31.8337673,6.20927985 33.7629592,6.20927985 C35.6921511,6.20927985 37.2556791,7.7728079 37.2556791,9.70199977"/>
        </g>
      </g>
      <g id="reschedule-animejs-app1" transform="translate(19 47)">
        <g transform="translate(.6 .6)">
          <path fill="#00C176" d="M155.231996,131.223855 C155.231996,132.052078 154.745952,132.723357 154.146147,132.723357 L1.08584878,132.723357 C0.486044752,132.723357 0,132.052078 0,131.223855 L4.4408921e-16,3.88079991 C1.81609852e-16,1.7374933 1.7374933,4.83461113e-15 3.88079991,4.4408921e-15 L151.351196,4.4408921e-16 C153.494503,-1.51787392e-14 155.231996,1.7374933 155.231996,3.88079991 L155.231996,131.223855 Z"/>
          <text fill="#FFF" font-size="26.389" font-weight="bold" class="sans-serif">
            <tspan x="50.486" y="84.54">APP</tspan>
          </text>
          <path fill="#CCC" d="M3.88079991,0 L151.351196,0 C153.494503,-3.93719036e-16 155.231996,1.7374933 155.231996,3.88079991 L155.231996,17.8516796 L0,17.8516796 L0,3.88079991 C-2.62479357e-16,1.7374933 1.7374933,-9.38548593e-16 3.88079991,-1.33226763e-15 Z"/>
          <path fill="#E74C3C" d="M13.1947197,9.70199977 C13.1947197,11.6311916 11.6311916,13.1947197 9.70199977,13.1947197 C7.7728079,13.1947197 6.20927985,11.6311916 6.20927985,9.70199977 C6.20927985,7.7728079 7.7728079,6.20927985 9.70199977,6.20927985 C11.6311916,6.20927985 13.1947197,7.7728079 13.1947197,9.70199977"/>
          <path fill="#F1C40F" d="M25.6132794,9.70199977 C25.6132794,11.6311916 24.0497513,13.1947197 22.1205595,13.1947197 C20.1913676,13.1947197 18.6278396,11.6311916 18.6278396,9.70199977 C18.6278396,7.7728079 20.1913676,6.20927985 22.1205595,6.20927985 C24.0497513,6.20927985 25.6132794,7.7728079 25.6132794,9.70199977"/>
          <path fill="#2ECC71" d="M37.2556791,9.70199977 C37.2556791,11.6311916 35.6921511,13.1947197 33.7629592,13.1947197 C31.8337673,13.1947197 30.2702393,11.6311916 30.2702393,9.70199977 C30.2702393,7.7728079 31.8337673,6.20927985 33.7629592,6.20927985 C35.6921511,6.20927985 37.2556791,7.7728079 37.2556791,9.70199977"/>
        </g>
      </g>
    </g>
  </g>
</svg>
<script src="anime.min.js"></script>
<script src="isScrolledIntoView.js"></script>
<script>
(function() {
  const svg = document.querySelector('#reschedule')
  const wrapper = document.createElement('div')
  wrapper.classList = 'relative'
  const restart = document.createElement('div')
  restart.classList = 'restart'
  restart.innerHTML = '<span>Restart</span>'
  wrap(svg, wrapper)
  wrapper.appendChild(restart)
  const basicTimeline = anime.timeline({
    autoplay: false,
  });
  basicTimeline
  .add({
    begin: function() {
      wrapper.onclick = function() {}
      restart.classList.add('inactive')
    }
  })
  .add({
    targets: '#reschedule-animejs-up2',
    opacity: [1, 0],
    easing: 'easeOutExpo',
  })
  .add({
    targets: '#reschedule-animejs-down',
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: '#reschedule-animejs-server',
    opacity: [1, 0.2],
    easing: 'easeOutExpo',
  })
  .add({})
  .add({
    targets: '#reschedule-animejs-app3',
    opacity: [1, 0],
    easing: 'easeOutExpo',
  })
  .add({
    targets: '#reschedule-animejs-app5',
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    complete: function() {
      wrapper.onclick = basicTimeline.restart
      restart.classList.remove('inactive')
    }
  })
  wrapper.onclick = basicTimeline.restart
  onScrollIntoView(svg, function() {
    setTimeout(basicTimeline.play, 1000)
  });
  function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }
})();
</script>
```

If one of the application fails, perhaps because of a memory leak, Kubernetes will restart the app a predetermined number of times.

Kubernetes is designed with the understanding that nodes cannot be expected to continue working forever, so has a design that is self-healing; it is always observing the current state of the infrastructure and takes action whenever it detects that this doesn't match the desired state of the infrastructure.

Where it finds a discrepancy, for example, if there isn't enough capacity to run all of your apps, it will ask the cloud provider to provision more compute resources.

```include
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 564" id="scaling">
  <g fill="none" fill-rule="evenodd">
    <g id="scaling-animejs-server2" transform="translate(555 110)">
      <g>
        <path fill="#7C7C7C" d="M140,260.436888 L140,282.003361 C140,283.194445 139.271161,284.160008 138.372093,284.160008 L1.62790688,284.160008 C0.728838736,284.160008 1.10104092e-16,283.194445 0,282.003361 L0,260.436888 C-1.10104092e-16,259.245805 0.728838736,258.280241 1.62790688,258.280241 L138.372093,258.280241 C139.271161,258.280241 140,259.245805 140,260.436888 Z"/>
        <g transform="translate(5.986 265.052)">
          <polygon fill="#D8D8D8" points="22.141 0 101.434 0 101.434 3.081 22.141 3.081"/>
          <polygon fill="#D7D7D7" points="5.53 0 8.602 0 8.602 3.072 5.53 3.072"/>
          <polygon fill="#D7D7D7" points="0 0 3.072 0 3.072 3.072 0 3.072"/>
          <polygon fill="#00CD00" points="119 0 122.072 0 122.072 3.072 119 3.072"/>
          <polygon fill="#D7D400" points="114 0 117.072 0 117.072 3.072 114 3.072"/>
          <polygon fill="#FF3C00" points="109 0 112.072 0 112.072 3.072 109 3.072"/>
          <polygon fill="#00CD00" points="124 0 127.072 0 127.072 3.072 124 3.072"/>
        </g>
        <g transform="translate(5.986 270.444)">
          <polygon fill="#D8D8D8" points="22.141 0 101.434 0 101.434 3.081 22.141 3.081"/>
          <polygon fill="#D7D7D7" points="5.53 0 8.602 0 8.602 3.072 5.53 3.072"/>
          <polygon fill="#D7D7D7" points="0 0 3.072 0 3.072 3.072 0 3.072"/>
          <polygon fill="#00CD00" points="119 0 122.072 0 122.072 3.072 119 3.072"/>
          <polygon fill="#D7D400" points="114 0 117.072 0 117.072 3.072 114 3.072"/>
          <polygon fill="#FF3C00" points="109 0 112.072 0 112.072 3.072 109 3.072"/>
          <polygon fill="#00CD00" points="124 0 127.072 0 127.072 3.072 124 3.072"/>
        </g>
        <g transform="translate(5.986 275.836)">
          <polygon fill="#D8D8D8" points="22.141 0 101.434 0 101.434 3.081 22.141 3.081"/>
          <polygon fill="#D7D7D7" points="5.53 0 8.602 0 8.602 3.072 5.53 3.072"/>
          <polygon fill="#D7D7D7" points="0 0 3.072 0 3.072 3.072 0 3.072"/>
          <polygon fill="#00CD00" points="119 0 122.072 0 122.072 3.072 119 3.072"/>
          <polygon fill="#D7D400" points="114 0 117.072 0 117.072 3.072 114 3.072"/>
          <polygon fill="#FF3C00" points="109 0 112.072 0 112.072 3.072 109 3.072"/>
          <polygon fill="#00CD00" points="124 0 127.072 0 127.072 3.072 124 3.072"/>
        </g>
        <path fill="#7C7C7C" d="M140,2.30399993 L140,252.979192 C140,254.251656 139.271161,255.283192 138.372093,255.283192 L1.62790688,255.283192 C0.728838736,255.283192 1.10104092e-16,254.251656 0,252.979192 L0,2.30399993 C-1.10104092e-16,1.03153591 0.728838736,2.33747849e-16 1.62790688,0 L138.372093,0 C139.271161,1.21981781e-14 140,1.03153591 140,2.30399993 Z"/>
        <polygon fill="#D7D7D7" points="6.758 246.067 133.768 246.067 133.768 249.139 6.758 249.139"/>
        <polygon fill="#D7D7D7" points="5.99 16.589 133.004 16.589 133.004 19.661 5.99 19.661"/>
        <polygon fill="#D7D7D7" points="5.99 11.059 133.004 11.059 133.004 14.131 5.99 14.131"/>
        <polygon fill="#D7D7D7" points="5.99 5.53 133.004 5.53 133.004 8.602 5.99 8.602"/>
        <path fill="#FFF" d="M6.61482842,25.8810795 L132.371218,25.8810795 C132.718485,25.8810795 133,26.2949136 133,26.8054038 L133,239.399986 C133,239.910476 132.718485,240.32431 132.371218,240.32431 L6.61482842,240.32431 C6.26756176,240.32431 5.98604651,239.910476 5.98604651,239.399986 L5.98604651,26.8054038 C5.98604651,26.2949136 6.26756176,25.8810795 6.61482842,25.8810795 Z"/>
      </g>
      <g id="scaling-animejs-app6" transform="translate(14 34)">
        <g>
          <path fill="#00C176" d="M110.879999,93.7313264 C110.879999,94.3229146 110.532824,94.8023993 110.104393,94.8023993 L0.775606287,94.8023993 C0.347174829,94.8023993 0,94.3229146 0,93.7313264 L0,2.77199998 C-1.87485259e-16,1.24106666 1.24106666,-3.27148579e-15 2.77199998,-3.55271368e-15 L108.107999,0 C109.638933,-2.81227888e-16 110.879999,1.24106666 110.879999,2.77199998 L110.879999,93.7313264 Z"/>
          <text fill="#FFF" font-size="18.85" font-weight="bold" class="sans-serif">
            <tspan x="36.061" y="60.243">APP</tspan>
          </text>
          <path fill="#CCC" d="M2.77199998,0 L108.107999,-4.4408921e-16 C109.638933,-7.25317098e-16 110.879999,1.24106666 110.879999,2.77199998 L110.879999,12.7511999 L0,12.7511999 L-4.4408921e-16,2.77199998 C-6.31574468e-16,1.24106666 1.24106666,-1.62861322e-16 2.77199998,-4.4408921e-16 Z"/>
          <path fill="#E74C3C" d="M9.42479993,6.92999995 C9.42479993,8.30799417 8.30799417,9.42479993 6.92999995,9.42479993 C5.55200574,9.42479993 4.43519997,8.30799417 4.43519997,6.92999995 C4.43519997,5.55200574 5.55200574,4.43519997 6.92999995,4.43519997 C8.30799417,4.43519997 9.42479993,5.55200574 9.42479993,6.92999995"/>
          <path fill="#F1C40F" d="M18.2951999,6.92999995 C18.2951999,8.30799417 17.1783941,9.42479993 15.8003999,9.42479993 C14.4224057,9.42479993 13.3055999,8.30799417 13.3055999,6.92999995 C13.3055999,5.55200574 14.4224057,4.43519997 15.8003999,4.43519997 C17.1783941,4.43519997 18.2951999,5.55200574 18.2951999,6.92999995"/>
          <path fill="#2ECC71" d="M26.6111998,6.92999995 C26.6111998,8.30799417 25.494394,9.42479993 24.1163998,9.42479993 C22.7384056,9.42479993 21.6215998,8.30799417 21.6215998,6.92999995 C21.6215998,5.55200574 22.7384056,4.43519997 24.1163998,4.43519997 C25.494394,4.43519997 26.6111998,5.55200574 26.6111998,6.92999995"/>
        </g>
      </g>
    </g>
    <g transform="translate(405 110)">
      <g>
        <path fill="#7C7C7C" d="M140,260.436888 L140,282.003361 C140,283.194445 139.271161,284.160008 138.372093,284.160008 L1.62790688,284.160008 C0.728838736,284.160008 1.10104092e-16,283.194445 0,282.003361 L0,260.436888 C-1.10104092e-16,259.245805 0.728838736,258.280241 1.62790688,258.280241 L138.372093,258.280241 C139.271161,258.280241 140,259.245805 140,260.436888 Z"/>
        <g transform="translate(5.986 265.052)">
          <polygon fill="#D8D8D8" points="22.141 0 101.434 0 101.434 3.081 22.141 3.081"/>
          <polygon fill="#D7D7D7" points="5.53 0 8.602 0 8.602 3.072 5.53 3.072"/>
          <polygon fill="#D7D7D7" points="0 0 3.072 0 3.072 3.072 0 3.072"/>
          <polygon fill="#00CD00" points="119 0 122.072 0 122.072 3.072 119 3.072"/>
          <polygon fill="#D7D400" points="114 0 117.072 0 117.072 3.072 114 3.072"/>
          <polygon fill="#FF3C00" points="109 0 112.072 0 112.072 3.072 109 3.072"/>
          <polygon fill="#00CD00" points="124 0 127.072 0 127.072 3.072 124 3.072"/>
        </g>
        <g transform="translate(5.986 270.444)">
          <polygon fill="#D8D8D8" points="22.141 0 101.434 0 101.434 3.081 22.141 3.081"/>
          <polygon fill="#D7D7D7" points="5.53 0 8.602 0 8.602 3.072 5.53 3.072"/>
          <polygon fill="#D7D7D7" points="0 0 3.072 0 3.072 3.072 0 3.072"/>
          <polygon fill="#00CD00" points="119 0 122.072 0 122.072 3.072 119 3.072"/>
          <polygon fill="#D7D400" points="114 0 117.072 0 117.072 3.072 114 3.072"/>
          <polygon fill="#FF3C00" points="109 0 112.072 0 112.072 3.072 109 3.072"/>
          <polygon fill="#00CD00" points="124 0 127.072 0 127.072 3.072 124 3.072"/>
        </g>
        <g transform="translate(5.986 275.836)">
          <polygon fill="#D8D8D8" points="22.141 0 101.434 0 101.434 3.081 22.141 3.081"/>
          <polygon fill="#D7D7D7" points="5.53 0 8.602 0 8.602 3.072 5.53 3.072"/>
          <polygon fill="#D7D7D7" points="0 0 3.072 0 3.072 3.072 0 3.072"/>
          <polygon fill="#00CD00" points="119 0 122.072 0 122.072 3.072 119 3.072"/>
          <polygon fill="#D7D400" points="114 0 117.072 0 117.072 3.072 114 3.072"/>
          <polygon fill="#FF3C00" points="109 0 112.072 0 112.072 3.072 109 3.072"/>
          <polygon fill="#00CD00" points="124 0 127.072 0 127.072 3.072 124 3.072"/>
        </g>
        <path fill="#7C7C7C" d="M140,2.30399993 L140,252.979192 C140,254.251656 139.271161,255.283192 138.372093,255.283192 L1.62790688,255.283192 C0.728838736,255.283192 1.10104092e-16,254.251656 0,252.979192 L0,2.30399993 C-1.10104092e-16,1.03153591 0.728838736,2.33747849e-16 1.62790688,0 L138.372093,0 C139.271161,1.21981781e-14 140,1.03153591 140,2.30399993 Z"/>
        <polygon fill="#D7D7D7" points="6.758 246.067 133.768 246.067 133.768 249.139 6.758 249.139"/>
        <polygon fill="#D7D7D7" points="5.99 16.589 133.004 16.589 133.004 19.661 5.99 19.661"/>
        <polygon fill="#D7D7D7" points="5.99 11.059 133.004 11.059 133.004 14.131 5.99 14.131"/>
        <polygon fill="#D7D7D7" points="5.99 5.53 133.004 5.53 133.004 8.602 5.99 8.602"/>
        <path fill="#FFF" d="M6.61482842,25.8810795 L132.371218,25.8810795 C132.718485,25.8810795 133,26.2949136 133,26.8054038 L133,239.399986 C133,239.910476 132.718485,240.32431 132.371218,240.32431 L6.61482842,240.32431 C6.26756176,240.32431 5.98604651,239.910476 5.98604651,239.399986 L5.98604651,26.8054038 C5.98604651,26.2949136 6.26756176,25.8810795 6.61482842,25.8810795 Z"/>
      </g>
      <g id="scaling-animejs-app4" transform="translate(14 136)">
        <g>
          <path fill="#00C176" d="M110.879999,93.7313264 C110.879999,94.3229146 110.532824,94.8023993 110.104393,94.8023993 L0.775606287,94.8023993 C0.347174829,94.8023993 0,94.3229146 0,93.7313264 L0,2.77199998 C-1.87485259e-16,1.24106666 1.24106666,-3.27148579e-15 2.77199998,-3.55271368e-15 L108.107999,0 C109.638933,-2.81227888e-16 110.879999,1.24106666 110.879999,2.77199998 L110.879999,93.7313264 Z"/>
          <text fill="#FFF" font-size="18.85" font-weight="bold" class="sans-serif">
            <tspan x="36.061" y="60.243">APP</tspan>
          </text>
          <path fill="#CCC" d="M2.77199998,0 L108.107999,-4.4408921e-16 C109.638933,-7.25317098e-16 110.879999,1.24106666 110.879999,2.77199998 L110.879999,12.7511999 L0,12.7511999 L-4.4408921e-16,2.77199998 C-6.31574468e-16,1.24106666 1.24106666,-1.62861322e-16 2.77199998,-4.4408921e-16 Z"/>
          <path fill="#E74C3C" d="M9.42479993,6.92999995 C9.42479993,8.30799417 8.30799417,9.42479993 6.92999995,9.42479993 C5.55200574,9.42479993 4.43519997,8.30799417 4.43519997,6.92999995 C4.43519997,5.55200574 5.55200574,4.43519997 6.92999995,4.43519997 C8.30799417,4.43519997 9.42479993,5.55200574 9.42479993,6.92999995"/>
          <path fill="#F1C40F" d="M18.2951999,6.92999995 C18.2951999,8.30799417 17.1783941,9.42479993 15.8003999,9.42479993 C14.4224057,9.42479993 13.3055999,8.30799417 13.3055999,6.92999995 C13.3055999,5.55200574 14.4224057,4.43519997 15.8003999,4.43519997 C17.1783941,4.43519997 18.2951999,5.55200574 18.2951999,6.92999995"/>
          <path fill="#2ECC71" d="M26.6111998,6.92999995 C26.6111998,8.30799417 25.494394,9.42479993 24.1163998,9.42479993 C22.7384056,9.42479993 21.6215998,8.30799417 21.6215998,6.92999995 C21.6215998,5.55200574 22.7384056,4.43519997 24.1163998,4.43519997 C25.494394,4.43519997 26.6111998,5.55200574 26.6111998,6.92999995"/>
        </g>
      </g>
      <g id="scaling-animejs-app2" transform="translate(14 34)">
        <g>
          <path fill="#00C176" d="M110.879999,93.7313264 C110.879999,94.3229146 110.532824,94.8023993 110.104393,94.8023993 L0.775606287,94.8023993 C0.347174829,94.8023993 0,94.3229146 0,93.7313264 L0,2.77199998 C-1.87485259e-16,1.24106666 1.24106666,-3.27148579e-15 2.77199998,-3.55271368e-15 L108.107999,0 C109.638933,-2.81227888e-16 110.879999,1.24106666 110.879999,2.77199998 L110.879999,93.7313264 Z"/>
          <text fill="#FFF" font-size="18.85" font-weight="bold" class="sans-serif">
            <tspan x="36.061" y="60.243">APP</tspan>
          </text>
          <path fill="#CCC" d="M2.77199998,0 L108.107999,-4.4408921e-16 C109.638933,-7.25317098e-16 110.879999,1.24106666 110.879999,2.77199998 L110.879999,12.7511999 L0,12.7511999 L-4.4408921e-16,2.77199998 C-6.31574468e-16,1.24106666 1.24106666,-1.62861322e-16 2.77199998,-4.4408921e-16 Z"/>
          <path fill="#E74C3C" d="M9.42479993,6.92999995 C9.42479993,8.30799417 8.30799417,9.42479993 6.92999995,9.42479993 C5.55200574,9.42479993 4.43519997,8.30799417 4.43519997,6.92999995 C4.43519997,5.55200574 5.55200574,4.43519997 6.92999995,4.43519997 C8.30799417,4.43519997 9.42479993,5.55200574 9.42479993,6.92999995"/>
          <path fill="#F1C40F" d="M18.2951999,6.92999995 C18.2951999,8.30799417 17.1783941,9.42479993 15.8003999,9.42479993 C14.4224057,9.42479993 13.3055999,8.30799417 13.3055999,6.92999995 C13.3055999,5.55200574 14.4224057,4.43519997 15.8003999,4.43519997 C17.1783941,4.43519997 18.2951999,5.55200574 18.2951999,6.92999995"/>
          <path fill="#2ECC71" d="M26.6111998,6.92999995 C26.6111998,8.30799417 25.494394,9.42479993 24.1163998,9.42479993 C22.7384056,9.42479993 21.6215998,8.30799417 21.6215998,6.92999995 C21.6215998,5.55200574 22.7384056,4.43519997 24.1163998,4.43519997 C25.494394,4.43519997 26.6111998,5.55200574 26.6111998,6.92999995"/>
        </g>
      </g>
    </g>
    <g transform="translate(255 110)">
      <g>
        <path fill="#7C7C7C" d="M140,260.436888 L140,282.003361 C140,283.194445 139.271161,284.160008 138.372093,284.160008 L1.62790688,284.160008 C0.728838736,284.160008 1.10104092e-16,283.194445 0,282.003361 L0,260.436888 C-1.10104092e-16,259.245805 0.728838736,258.280241 1.62790688,258.280241 L138.372093,258.280241 C139.271161,258.280241 140,259.245805 140,260.436888 Z"/>
        <g transform="translate(5.986 265.052)">
          <polygon fill="#D8D8D8" points="22.141 0 101.434 0 101.434 3.081 22.141 3.081"/>
          <polygon fill="#D7D7D7" points="5.53 0 8.602 0 8.602 3.072 5.53 3.072"/>
          <polygon fill="#D7D7D7" points="0 0 3.072 0 3.072 3.072 0 3.072"/>
          <polygon fill="#00CD00" points="119 0 122.072 0 122.072 3.072 119 3.072"/>
          <polygon fill="#D7D400" points="114 0 117.072 0 117.072 3.072 114 3.072"/>
          <polygon fill="#FF3C00" points="109 0 112.072 0 112.072 3.072 109 3.072"/>
          <polygon fill="#00CD00" points="124 0 127.072 0 127.072 3.072 124 3.072"/>
        </g>
        <g transform="translate(5.986 270.444)">
          <polygon fill="#D8D8D8" points="22.141 0 101.434 0 101.434 3.081 22.141 3.081"/>
          <polygon fill="#D7D7D7" points="5.53 0 8.602 0 8.602 3.072 5.53 3.072"/>
          <polygon fill="#D7D7D7" points="0 0 3.072 0 3.072 3.072 0 3.072"/>
          <polygon fill="#00CD00" points="119 0 122.072 0 122.072 3.072 119 3.072"/>
          <polygon fill="#D7D400" points="114 0 117.072 0 117.072 3.072 114 3.072"/>
          <polygon fill="#FF3C00" points="109 0 112.072 0 112.072 3.072 109 3.072"/>
          <polygon fill="#00CD00" points="124 0 127.072 0 127.072 3.072 124 3.072"/>
        </g>
        <g transform="translate(5.986 275.836)">
          <polygon fill="#D8D8D8" points="22.141 0 101.434 0 101.434 3.081 22.141 3.081"/>
          <polygon fill="#D7D7D7" points="5.53 0 8.602 0 8.602 3.072 5.53 3.072"/>
          <polygon fill="#D7D7D7" points="0 0 3.072 0 3.072 3.072 0 3.072"/>
          <polygon fill="#00CD00" points="119 0 122.072 0 122.072 3.072 119 3.072"/>
          <polygon fill="#D7D400" points="114 0 117.072 0 117.072 3.072 114 3.072"/>
          <polygon fill="#FF3C00" points="109 0 112.072 0 112.072 3.072 109 3.072"/>
          <polygon fill="#00CD00" points="124 0 127.072 0 127.072 3.072 124 3.072"/>
        </g>
        <path fill="#7C7C7C" d="M140,2.30399993 L140,252.979192 C140,254.251656 139.271161,255.283192 138.372093,255.283192 L1.62790688,255.283192 C0.728838736,255.283192 1.10104092e-16,254.251656 0,252.979192 L0,2.30399993 C-1.10104092e-16,1.03153591 0.728838736,2.33747849e-16 1.62790688,0 L138.372093,0 C139.271161,1.21981781e-14 140,1.03153591 140,2.30399993 Z"/>
        <polygon fill="#D7D7D7" points="6.758 246.067 133.768 246.067 133.768 249.139 6.758 249.139"/>
        <polygon fill="#D7D7D7" points="5.99 16.589 133.004 16.589 133.004 19.661 5.99 19.661"/>
        <polygon fill="#D7D7D7" points="5.99 11.059 133.004 11.059 133.004 14.131 5.99 14.131"/>
        <polygon fill="#D7D7D7" points="5.99 5.53 133.004 5.53 133.004 8.602 5.99 8.602"/>
        <path fill="#FFF" d="M6.61482842,25.8810795 L132.371218,25.8810795 C132.718485,25.8810795 133,26.2949136 133,26.8054038 L133,239.399986 C133,239.910476 132.718485,240.32431 132.371218,240.32431 L6.61482842,240.32431 C6.26756176,240.32431 5.98604651,239.910476 5.98604651,239.399986 L5.98604651,26.8054038 C5.98604651,26.2949136 6.26756176,25.8810795 6.61482842,25.8810795 Z"/>
      </g>
      <g id="scaling-animejs-app3" transform="translate(14 136)">
        <g>
          <path fill="#00C176" d="M110.879999,93.7313264 C110.879999,94.3229146 110.532824,94.8023993 110.104393,94.8023993 L0.775606287,94.8023993 C0.347174829,94.8023993 0,94.3229146 0,93.7313264 L0,2.77199998 C-1.87485259e-16,1.24106666 1.24106666,-3.27148579e-15 2.77199998,-3.55271368e-15 L108.107999,0 C109.638933,-2.81227888e-16 110.879999,1.24106666 110.879999,2.77199998 L110.879999,93.7313264 Z"/>
          <text fill="#FFF" font-size="18.85" font-weight="bold" class="sans-serif">
            <tspan x="36.061" y="60.243">APP</tspan>
          </text>
          <path fill="#CCC" d="M2.77199998,0 L108.107999,-4.4408921e-16 C109.638933,-7.25317098e-16 110.879999,1.24106666 110.879999,2.77199998 L110.879999,12.7511999 L0,12.7511999 L-4.4408921e-16,2.77199998 C-6.31574468e-16,1.24106666 1.24106666,-1.62861322e-16 2.77199998,-4.4408921e-16 Z"/>
          <path fill="#E74C3C" d="M9.42479993,6.92999995 C9.42479993,8.30799417 8.30799417,9.42479993 6.92999995,9.42479993 C5.55200574,9.42479993 4.43519997,8.30799417 4.43519997,6.92999995 C4.43519997,5.55200574 5.55200574,4.43519997 6.92999995,4.43519997 C8.30799417,4.43519997 9.42479993,5.55200574 9.42479993,6.92999995"/>
          <path fill="#F1C40F" d="M18.2951999,6.92999995 C18.2951999,8.30799417 17.1783941,9.42479993 15.8003999,9.42479993 C14.4224057,9.42479993 13.3055999,8.30799417 13.3055999,6.92999995 C13.3055999,5.55200574 14.4224057,4.43519997 15.8003999,4.43519997 C17.1783941,4.43519997 18.2951999,5.55200574 18.2951999,6.92999995"/>
          <path fill="#2ECC71" d="M26.6111998,6.92999995 C26.6111998,8.30799417 25.494394,9.42479993 24.1163998,9.42479993 C22.7384056,9.42479993 21.6215998,8.30799417 21.6215998,6.92999995 C21.6215998,5.55200574 22.7384056,4.43519997 24.1163998,4.43519997 C25.494394,4.43519997 26.6111998,5.55200574 26.6111998,6.92999995"/>
        </g>
      </g>
      <g id="scaling-animejs-app1" transform="translate(14 34)">
        <g>
          <path fill="#00C176" d="M110.879999,93.7313264 C110.879999,94.3229146 110.532824,94.8023993 110.104393,94.8023993 L0.775606287,94.8023993 C0.347174829,94.8023993 0,94.3229146 0,93.7313264 L0,2.77199998 C-1.87485259e-16,1.24106666 1.24106666,-3.27148579e-15 2.77199998,-3.55271368e-15 L108.107999,0 C109.638933,-2.81227888e-16 110.879999,1.24106666 110.879999,2.77199998 L110.879999,93.7313264 Z"/>
          <text fill="#FFF" font-size="18.85" font-weight="bold" class="sans-serif">
            <tspan x="36.061" y="60.243">APP</tspan>
          </text>
          <path fill="#CCC" d="M2.77199998,0 L108.107999,-4.4408921e-16 C109.638933,-7.25317098e-16 110.879999,1.24106666 110.879999,2.77199998 L110.879999,12.7511999 L0,12.7511999 L-4.4408921e-16,2.77199998 C-6.31574468e-16,1.24106666 1.24106666,-1.62861322e-16 2.77199998,-4.4408921e-16 Z"/>
          <path fill="#E74C3C" d="M9.42479993,6.92999995 C9.42479993,8.30799417 8.30799417,9.42479993 6.92999995,9.42479993 C5.55200574,9.42479993 4.43519997,8.30799417 4.43519997,6.92999995 C4.43519997,5.55200574 5.55200574,4.43519997 6.92999995,4.43519997 C8.30799417,4.43519997 9.42479993,5.55200574 9.42479993,6.92999995"/>
          <path fill="#F1C40F" d="M18.2951999,6.92999995 C18.2951999,8.30799417 17.1783941,9.42479993 15.8003999,9.42479993 C14.4224057,9.42479993 13.3055999,8.30799417 13.3055999,6.92999995 C13.3055999,5.55200574 14.4224057,4.43519997 15.8003999,4.43519997 C17.1783941,4.43519997 18.2951999,5.55200574 18.2951999,6.92999995"/>
          <path fill="#2ECC71" d="M26.6111998,6.92999995 C26.6111998,8.30799417 25.494394,9.42479993 24.1163998,9.42479993 C22.7384056,9.42479993 21.6215998,8.30799417 21.6215998,6.92999995 C21.6215998,5.55200574 22.7384056,4.43519997 24.1163998,4.43519997 C25.494394,4.43519997 26.6111998,5.55200574 26.6111998,6.92999995"/>
        </g>
      </g>
    </g>
    <g transform="translate(105 110)">
      <g id="scaling-animejs-server1">
        <path fill="#7C7C7C" d="M140,260.436888 L140,282.003361 C140,283.194445 139.271161,284.160008 138.372093,284.160008 L1.62790688,284.160008 C0.728838736,284.160008 1.10104092e-16,283.194445 0,282.003361 L0,260.436888 C-1.10104092e-16,259.245805 0.728838736,258.280241 1.62790688,258.280241 L138.372093,258.280241 C139.271161,258.280241 140,259.245805 140,260.436888 Z"/>
        <g transform="translate(5.986 265.052)">
          <polygon fill="#D8D8D8" points="22.141 0 101.434 0 101.434 3.081 22.141 3.081"/>
          <polygon fill="#D7D7D7" points="5.53 0 8.602 0 8.602 3.072 5.53 3.072"/>
          <polygon fill="#D7D7D7" points="0 0 3.072 0 3.072 3.072 0 3.072"/>
          <polygon fill="#00CD00" points="119 0 122.072 0 122.072 3.072 119 3.072"/>
          <polygon fill="#D7D400" points="114 0 117.072 0 117.072 3.072 114 3.072"/>
          <polygon fill="#FF3C00" points="109 0 112.072 0 112.072 3.072 109 3.072"/>
          <polygon fill="#00CD00" points="124 0 127.072 0 127.072 3.072 124 3.072"/>
        </g>
        <g transform="translate(5.986 270.444)">
          <polygon fill="#D8D8D8" points="22.141 0 101.434 0 101.434 3.081 22.141 3.081"/>
          <polygon fill="#D7D7D7" points="5.53 0 8.602 0 8.602 3.072 5.53 3.072"/>
          <polygon fill="#D7D7D7" points="0 0 3.072 0 3.072 3.072 0 3.072"/>
          <polygon fill="#00CD00" points="119 0 122.072 0 122.072 3.072 119 3.072"/>
          <polygon fill="#D7D400" points="114 0 117.072 0 117.072 3.072 114 3.072"/>
          <polygon fill="#FF3C00" points="109 0 112.072 0 112.072 3.072 109 3.072"/>
          <polygon fill="#00CD00" points="124 0 127.072 0 127.072 3.072 124 3.072"/>
        </g>
        <g transform="translate(5.986 275.836)">
          <polygon fill="#D8D8D8" points="22.141 0 101.434 0 101.434 3.081 22.141 3.081"/>
          <polygon fill="#D7D7D7" points="5.53 0 8.602 0 8.602 3.072 5.53 3.072"/>
          <polygon fill="#D7D7D7" points="0 0 3.072 0 3.072 3.072 0 3.072"/>
          <polygon fill="#00CD00" points="119 0 122.072 0 122.072 3.072 119 3.072"/>
          <polygon fill="#D7D400" points="114 0 117.072 0 117.072 3.072 114 3.072"/>
          <polygon fill="#FF3C00" points="109 0 112.072 0 112.072 3.072 109 3.072"/>
          <polygon fill="#00CD00" points="124 0 127.072 0 127.072 3.072 124 3.072"/>
        </g>
        <path fill="#7C7C7C" d="M140,2.30399993 L140,252.979192 C140,254.251656 139.271161,255.283192 138.372093,255.283192 L1.62790688,255.283192 C0.728838736,255.283192 1.10104092e-16,254.251656 0,252.979192 L0,2.30399993 C-1.10104092e-16,1.03153591 0.728838736,2.33747849e-16 1.62790688,0 L138.372093,0 C139.271161,1.21981781e-14 140,1.03153591 140,2.30399993 Z"/>
        <polygon fill="#D7D7D7" points="6.758 246.067 133.768 246.067 133.768 249.139 6.758 249.139"/>
        <polygon fill="#D7D7D7" points="5.99 16.589 133.004 16.589 133.004 19.661 5.99 19.661"/>
        <polygon fill="#D7D7D7" points="5.99 11.059 133.004 11.059 133.004 14.131 5.99 14.131"/>
        <polygon fill="#D7D7D7" points="5.99 5.53 133.004 5.53 133.004 8.602 5.99 8.602"/>
        <path fill="#FFF" d="M6.61482842,25.8810795 L132.371218,25.8810795 C132.718485,25.8810795 133,26.2949136 133,26.8054038 L133,239.399986 C133,239.910476 132.718485,240.32431 132.371218,240.32431 L6.61482842,240.32431 C6.26756176,240.32431 5.98604651,239.910476 5.98604651,239.399986 L5.98604651,26.8054038 C5.98604651,26.2949136 6.26756176,25.8810795 6.61482842,25.8810795 Z"/>
      </g>
      <g id="scaling-animejs-app5" transform="translate(14 34)">
        <g>
          <path fill="#00C176" d="M110.879999,93.7313264 C110.879999,94.3229146 110.532824,94.8023993 110.104393,94.8023993 L0.775606287,94.8023993 C0.347174829,94.8023993 0,94.3229146 0,93.7313264 L0,2.77199998 C-1.87485259e-16,1.24106666 1.24106666,-3.27148579e-15 2.77199998,-3.55271368e-15 L108.107999,0 C109.638933,-2.81227888e-16 110.879999,1.24106666 110.879999,2.77199998 L110.879999,93.7313264 Z"/>
          <text fill="#FFF" font-size="18.85" font-weight="bold" class="sans-serif">
            <tspan x="36.061" y="60.243">APP</tspan>
          </text>
          <path fill="#CCC" d="M2.77199998,0 L108.107999,-4.4408921e-16 C109.638933,-7.25317098e-16 110.879999,1.24106666 110.879999,2.77199998 L110.879999,12.7511999 L0,12.7511999 L-4.4408921e-16,2.77199998 C-6.31574468e-16,1.24106666 1.24106666,-1.62861322e-16 2.77199998,-4.4408921e-16 Z"/>
          <path fill="#E74C3C" d="M9.42479993,6.92999995 C9.42479993,8.30799417 8.30799417,9.42479993 6.92999995,9.42479993 C5.55200574,9.42479993 4.43519997,8.30799417 4.43519997,6.92999995 C4.43519997,5.55200574 5.55200574,4.43519997 6.92999995,4.43519997 C8.30799417,4.43519997 9.42479993,5.55200574 9.42479993,6.92999995"/>
          <path fill="#F1C40F" d="M18.2951999,6.92999995 C18.2951999,8.30799417 17.1783941,9.42479993 15.8003999,9.42479993 C14.4224057,9.42479993 13.3055999,8.30799417 13.3055999,6.92999995 C13.3055999,5.55200574 14.4224057,4.43519997 15.8003999,4.43519997 C17.1783941,4.43519997 18.2951999,5.55200574 18.2951999,6.92999995"/>
          <path fill="#2ECC71" d="M26.6111998,6.92999995 C26.6111998,8.30799417 25.494394,9.42479993 24.1163998,9.42479993 C22.7384056,9.42479993 21.6215998,8.30799417 21.6215998,6.92999995 C21.6215998,5.55200574 22.7384056,4.43519997 24.1163998,4.43519997 C25.494394,4.43519997 26.6111998,5.55200574 26.6111998,6.92999995"/>
        </g>
      </g>
    </g>
  </g>
</svg>
<script src="anime.min.js"></script>
<script src="isScrolledIntoView.js"></script>
<script>
(function() {
  const svg = document.querySelector('#scaling')
  const wrapper = document.createElement('div')
  wrapper.classList = 'relative'
  const restart = document.createElement('div')
  restart.classList = 'restart'
  restart.innerHTML = '<span>Restart</span>'
  wrap(svg, wrapper)
  wrapper.appendChild(restart)
  const basicTimeline = anime.timeline({
    autoplay: false,
  });
  basicTimeline
  .add({
    begin: function() {
      wrapper.onclick = function() {}
      restart.classList.add('inactive')
    }
  })
  .add({
    targets: '#scaling-animejs-app1',
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: '#scaling-animejs-app2',
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: '#scaling-animejs-app3',
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: '#scaling-animejs-app4',
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: ['#scaling-animejs-server1', '#scaling-animejs-server2'],
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: '#scaling-animejs-app5',
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: '#scaling-animejs-app6',
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    complete: function() {
      wrapper.onclick = basicTimeline.restart
      restart.classList.remove('inactive')
    }
  })
  wrapper.onclick = basicTimeline.restart
  onScrollIntoView(svg, function() {
    setTimeout(basicTimeline.play, 1000)
  });
  function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }
})();
</script>
```

Kubernetes is excellent for deploying containers in a way that maximises the efficiency of your infrastructure.

When you deploy three instances of an application, those are scheduled to maximise efficiency.

There's no guarantee that three instances of your applications will end up on five different devices.

```include
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 608" id="allocations">
  <g fill="none" fill-rule="evenodd">
    <g transform="translate(512 77)">
      <g>
        <path fill="#7C7C7C" d="M196,364.019306 L196,394.212368 C196,395.879884 194.979626,397.231674 193.72093,397.231674 L2.27906963,397.231674 C1.02037423,397.231674 1.54145729e-16,395.879884 0,394.212368 L0,364.019306 C-1.54145729e-16,362.351789 1.02037423,361 2.27906963,361 L193.72093,361 C194.979626,361 196,362.351789 196,364.019306 Z"/>
        <g transform="translate(8.38 371.073)">
          <polygon fill="#D8D8D8" points="31 0 142.01 0 142.01 4.314 31 4.314"/>
          <polygon fill="#D7D7D7" points="8 0 12.301 0 12.301 4.301 8 4.301"/>
          <polygon fill="#D7D7D7" points="0 0 4.301 0 4.301 4.301 0 4.301"/>
          <polygon fill="#00CD00" points="167 0 171.301 0 171.301 4.301 167 4.301"/>
          <polygon fill="#D7D400" points="160 0 164.301 0 164.301 4.301 160 4.301"/>
          <polygon fill="#FF3C00" points="153 0 157.301 0 157.301 4.301 153 4.301"/>
          <polygon fill="#00CD00" points="174 0 178.301 0 178.301 4.301 174 4.301"/>
        </g>
        <g transform="translate(8.38 378.621)">
          <polygon fill="#D8D8D8" points="31 0 142.01 0 142.01 4.314 31 4.314"/>
          <polygon fill="#D7D7D7" points="8 0 12.301 0 12.301 4.301 8 4.301"/>
          <polygon fill="#D7D7D7" points="0 0 4.301 0 4.301 4.301 0 4.301"/>
          <polygon fill="#00CD00" points="167 0 171.301 0 171.301 4.301 167 4.301"/>
          <polygon fill="#D7D400" points="160 0 164.301 0 164.301 4.301 160 4.301"/>
          <polygon fill="#FF3C00" points="153 0 157.301 0 157.301 4.301 153 4.301"/>
          <polygon fill="#00CD00" points="174 0 178.301 0 178.301 4.301 174 4.301"/>
        </g>
        <g transform="translate(8.38 386.17)">
          <polygon fill="#D8D8D8" points="31 0 142.01 0 142.01 4.314 31 4.314"/>
          <polygon fill="#D7D7D7" points="8 0 12.301 0 12.301 4.301 8 4.301"/>
          <polygon fill="#D7D7D7" points="0 0 4.301 0 4.301 4.301 0 4.301"/>
          <polygon fill="#00CD00" points="167 0 171.301 0 171.301 4.301 167 4.301"/>
          <polygon fill="#D7D400" points="160 0 164.301 0 164.301 4.301 160 4.301"/>
          <polygon fill="#FF3C00" points="153 0 157.301 0 157.301 4.301 153 4.301"/>
          <polygon fill="#00CD00" points="174 0 178.301 0 178.301 4.301 174 4.301"/>
        </g>
        <path fill="#7C7C7C" d="M196,3.22559985 L196,354.170863 C196,355.952313 194.979626,357.396463 193.72093,357.396463 L2.27906963,357.396463 C1.02037423,357.396463 1.54145729e-16,355.952313 0,354.170863 L0,3.22559985 C-1.54145729e-16,1.44415024 1.02037423,3.27246984e-16 2.27906963,0 L193.72093,0 C194.979626,1.70774491e-14 196,1.44415024 196,3.22559985 Z"/>
        <polygon fill="#D7D7D7" points="9 344 186.814 344 186.814 348.301 9 348.301"/>
        <polygon fill="#D7D7D7" points="8 23 185.82 23 185.82 27.301 8 27.301"/>
        <polygon fill="#D7D7D7" points="8 15 185.82 15 185.82 19.301 8 19.301"/>
        <polygon fill="#D7D7D7" points="8 7 185.82 7 185.82 11.301 8 11.301"/>
        <path fill="#FFF" d="M8.88029467,36 L184.93924,36 C185.425414,36 185.819535,36.5793677 185.819535,37.294054 L185.819535,334.926469 C185.819535,335.641155 185.425414,336.220523 184.93924,336.220523 L8.88029467,336.220523 C8.39412135,336.220523 8,335.641155 8,334.926469 L8,37.294054 C8,36.5793677 8.39412135,36 8.88029467,36 Z"/>
      </g>
      <g id="allocations-animejs-app1" transform="translate(20 47)">
        <g>
          <path fill="#00C176" d="M155.231996,131.223855 C155.231996,132.052078 154.745952,132.723357 154.146147,132.723357 L1.08584878,132.723357 C0.486044752,132.723357 0,132.052078 0,131.223855 L4.4408921e-16,3.88079991 C1.81609852e-16,1.7374933 1.7374933,4.83461113e-15 3.88079991,4.4408921e-15 L151.351196,4.4408921e-16 C153.494503,-1.51787392e-14 155.231996,1.7374933 155.231996,3.88079991 L155.231996,131.223855 Z"/>
          <text fill="#FFF" font-size="26.389" font-weight="bold" class="sans-serif">
            <tspan x="50.486" y="84.54">APP</tspan>
          </text>
          <path fill="#CCC" d="M3.88079991,0 L151.351196,0 C153.494503,-3.93719036e-16 155.231996,1.7374933 155.231996,3.88079991 L155.231996,17.8516796 L0,17.8516796 L0,3.88079991 C-2.62479357e-16,1.7374933 1.7374933,-9.38548593e-16 3.88079991,-1.33226763e-15 Z"/>
          <path fill="#E74C3C" d="M13.1947197,9.70199977 C13.1947197,11.6311916 11.6311916,13.1947197 9.70199977,13.1947197 C7.7728079,13.1947197 6.20927985,11.6311916 6.20927985,9.70199977 C6.20927985,7.7728079 7.7728079,6.20927985 9.70199977,6.20927985 C11.6311916,6.20927985 13.1947197,7.7728079 13.1947197,9.70199977"/>
          <path fill="#F1C40F" d="M25.6132794,9.70199977 C25.6132794,11.6311916 24.0497513,13.1947197 22.1205595,13.1947197 C20.1913676,13.1947197 18.6278396,11.6311916 18.6278396,9.70199977 C18.6278396,7.7728079 20.1913676,6.20927985 22.1205595,6.20927985 C24.0497513,6.20927985 25.6132794,7.7728079 25.6132794,9.70199977"/>
          <path fill="#2ECC71" d="M37.2556791,9.70199977 C37.2556791,11.6311916 35.6921511,13.1947197 33.7629592,13.1947197 C31.8337673,13.1947197 30.2702393,11.6311916 30.2702393,9.70199977 C30.2702393,7.7728079 31.8337673,6.20927985 33.7629592,6.20927985 C35.6921511,6.20927985 37.2556791,7.7728079 37.2556791,9.70199977"/>
        </g>
      </g>
      <g id="allocations-animejs-app2" transform="translate(20 190)">
        <g>
          <path fill="#00C176" d="M155.231996,131.223855 C155.231996,132.052078 154.745952,132.723357 154.146147,132.723357 L1.08584878,132.723357 C0.486044752,132.723357 0,132.052078 0,131.223855 L4.4408921e-16,3.88079991 C1.81609852e-16,1.7374933 1.7374933,4.83461113e-15 3.88079991,4.4408921e-15 L151.351196,4.4408921e-16 C153.494503,-1.51787392e-14 155.231996,1.7374933 155.231996,3.88079991 L155.231996,131.223855 Z"/>
          <text fill="#FFF" font-size="26.389" font-weight="bold" class="sans-serif">
            <tspan x="50.486" y="84.54">APP</tspan>
          </text>
          <path fill="#CCC" d="M3.88079991,0 L151.351196,0 C153.494503,-3.93719036e-16 155.231996,1.7374933 155.231996,3.88079991 L155.231996,17.8516796 L0,17.8516796 L0,3.88079991 C-2.62479357e-16,1.7374933 1.7374933,-9.38548593e-16 3.88079991,-1.33226763e-15 Z"/>
          <path fill="#E74C3C" d="M13.1947197,9.70199977 C13.1947197,11.6311916 11.6311916,13.1947197 9.70199977,13.1947197 C7.7728079,13.1947197 6.20927985,11.6311916 6.20927985,9.70199977 C6.20927985,7.7728079 7.7728079,6.20927985 9.70199977,6.20927985 C11.6311916,6.20927985 13.1947197,7.7728079 13.1947197,9.70199977"/>
          <path fill="#F1C40F" d="M25.6132794,9.70199977 C25.6132794,11.6311916 24.0497513,13.1947197 22.1205595,13.1947197 C20.1913676,13.1947197 18.6278396,11.6311916 18.6278396,9.70199977 C18.6278396,7.7728079 20.1913676,6.20927985 22.1205595,6.20927985 C24.0497513,6.20927985 25.6132794,7.7728079 25.6132794,9.70199977"/>
          <path fill="#2ECC71" d="M37.2556791,9.70199977 C37.2556791,11.6311916 35.6921511,13.1947197 33.7629592,13.1947197 C31.8337673,13.1947197 30.2702393,11.6311916 30.2702393,9.70199977 C30.2702393,7.7728079 31.8337673,6.20927985 33.7629592,6.20927985 C35.6921511,6.20927985 37.2556791,7.7728079 37.2556791,9.70199977"/>
        </g>
      </g>
    </g>
    <g transform="translate(302 77)">
      <g>
        <path fill="#7C7C7C" d="M196,364.019306 L196,394.212368 C196,395.879884 194.979626,397.231674 193.72093,397.231674 L2.27906963,397.231674 C1.02037423,397.231674 1.54145729e-16,395.879884 0,394.212368 L0,364.019306 C-1.54145729e-16,362.351789 1.02037423,361 2.27906963,361 L193.72093,361 C194.979626,361 196,362.351789 196,364.019306 Z"/>
        <g transform="translate(8.38 371.073)">
          <polygon fill="#D8D8D8" points="31 0 142.01 0 142.01 4.314 31 4.314"/>
          <polygon fill="#D7D7D7" points="8 0 12.301 0 12.301 4.301 8 4.301"/>
          <polygon fill="#D7D7D7" points="0 0 4.301 0 4.301 4.301 0 4.301"/>
          <polygon fill="#00CD00" points="167 0 171.301 0 171.301 4.301 167 4.301"/>
          <polygon fill="#D7D400" points="160 0 164.301 0 164.301 4.301 160 4.301"/>
          <polygon fill="#FF3C00" points="153 0 157.301 0 157.301 4.301 153 4.301"/>
          <polygon fill="#00CD00" points="174 0 178.301 0 178.301 4.301 174 4.301"/>
        </g>
        <g transform="translate(8.38 378.621)">
          <polygon fill="#D8D8D8" points="31 0 142.01 0 142.01 4.314 31 4.314"/>
          <polygon fill="#D7D7D7" points="8 0 12.301 0 12.301 4.301 8 4.301"/>
          <polygon fill="#D7D7D7" points="0 0 4.301 0 4.301 4.301 0 4.301"/>
          <polygon fill="#00CD00" points="167 0 171.301 0 171.301 4.301 167 4.301"/>
          <polygon fill="#D7D400" points="160 0 164.301 0 164.301 4.301 160 4.301"/>
          <polygon fill="#FF3C00" points="153 0 157.301 0 157.301 4.301 153 4.301"/>
          <polygon fill="#00CD00" points="174 0 178.301 0 178.301 4.301 174 4.301"/>
        </g>
        <g transform="translate(8.38 386.17)">
          <polygon fill="#D8D8D8" points="31 0 142.01 0 142.01 4.314 31 4.314"/>
          <polygon fill="#D7D7D7" points="8 0 12.301 0 12.301 4.301 8 4.301"/>
          <polygon fill="#D7D7D7" points="0 0 4.301 0 4.301 4.301 0 4.301"/>
          <polygon fill="#00CD00" points="167 0 171.301 0 171.301 4.301 167 4.301"/>
          <polygon fill="#D7D400" points="160 0 164.301 0 164.301 4.301 160 4.301"/>
          <polygon fill="#FF3C00" points="153 0 157.301 0 157.301 4.301 153 4.301"/>
          <polygon fill="#00CD00" points="174 0 178.301 0 178.301 4.301 174 4.301"/>
        </g>
        <path fill="#7C7C7C" d="M196,3.22559985 L196,354.170863 C196,355.952313 194.979626,357.396463 193.72093,357.396463 L2.27906963,357.396463 C1.02037423,357.396463 1.54145729e-16,355.952313 0,354.170863 L0,3.22559985 C-1.54145729e-16,1.44415024 1.02037423,3.27246984e-16 2.27906963,0 L193.72093,0 C194.979626,1.70774491e-14 196,1.44415024 196,3.22559985 Z"/>
        <polygon fill="#D7D7D7" points="9 344 186.814 344 186.814 348.301 9 348.301"/>
        <polygon fill="#D7D7D7" points="8 23 185.82 23 185.82 27.301 8 27.301"/>
        <polygon fill="#D7D7D7" points="8 15 185.82 15 185.82 19.301 8 19.301"/>
        <polygon fill="#D7D7D7" points="8 7 185.82 7 185.82 11.301 8 11.301"/>
        <path fill="#FFF" d="M8.88029467,36 L184.93924,36 C185.425414,36 185.819535,36.5793677 185.819535,37.294054 L185.819535,334.926469 C185.819535,335.641155 185.425414,336.220523 184.93924,336.220523 L8.88029467,336.220523 C8.39412135,336.220523 8,335.641155 8,334.926469 L8,37.294054 C8,36.5793677 8.39412135,36 8.88029467,36 Z"/>
      </g>
      <g transform="translate(20 47)">
        <path fill="#EC3344" d="M155.231996,131.223855 C155.231996,132.052078 154.745952,132.723357 154.146147,132.723357 L1.08584878,132.723357 C0.486044752,132.723357 0,132.052078 0,131.223855 L4.4408921e-16,3.88079991 C1.81609852e-16,1.7374933 1.7374933,4.83461113e-15 3.88079991,4.4408921e-15 L151.351196,4.4408921e-16 C153.494503,-1.51787392e-14 155.231996,1.7374933 155.231996,3.88079991 L155.231996,131.223855 Z"/>
        <text fill="#FFF" font-size="26.389" font-weight="bold" class="sans-serif">
          <tspan x="50.486" y="84.54">APP</tspan>
        </text>
        <path fill="#CCC" d="M3.88079991,0 L151.351196,0 C153.494503,-3.93719036e-16 155.231996,1.7374933 155.231996,3.88079991 L155.231996,17.8516796 L0,17.8516796 L0,3.88079991 C-2.62479357e-16,1.7374933 1.7374933,-9.38548593e-16 3.88079991,-1.33226763e-15 Z"/>
        <path fill="#E74C3C" d="M13.1947197,9.70199977 C13.1947197,11.6311916 11.6311916,13.1947197 9.70199977,13.1947197 C7.7728079,13.1947197 6.20927985,11.6311916 6.20927985,9.70199977 C6.20927985,7.7728079 7.7728079,6.20927985 9.70199977,6.20927985 C11.6311916,6.20927985 13.1947197,7.7728079 13.1947197,9.70199977"/>
        <path fill="#F1C40F" d="M25.6132794,9.70199977 C25.6132794,11.6311916 24.0497513,13.1947197 22.1205595,13.1947197 C20.1913676,13.1947197 18.6278396,11.6311916 18.6278396,9.70199977 C18.6278396,7.7728079 20.1913676,6.20927985 22.1205595,6.20927985 C24.0497513,6.20927985 25.6132794,7.7728079 25.6132794,9.70199977"/>
        <path fill="#2ECC71" d="M37.2556791,9.70199977 C37.2556791,11.6311916 35.6921511,13.1947197 33.7629592,13.1947197 C31.8337673,13.1947197 30.2702393,11.6311916 30.2702393,9.70199977 C30.2702393,7.7728079 31.8337673,6.20927985 33.7629592,6.20927985 C35.6921511,6.20927985 37.2556791,7.7728079 37.2556791,9.70199977"/>
      </g>
    </g>
    <g transform="translate(92 77)">
      <g>
        <path fill="#7C7C7C" d="M196,364.019306 L196,394.212368 C196,395.879884 194.979626,397.231674 193.72093,397.231674 L2.27906963,397.231674 C1.02037423,397.231674 1.54145729e-16,395.879884 0,394.212368 L0,364.019306 C-1.54145729e-16,362.351789 1.02037423,361 2.27906963,361 L193.72093,361 C194.979626,361 196,362.351789 196,364.019306 Z"/>
        <g transform="translate(8.38 371.073)">
          <polygon fill="#D8D8D8" points="31 0 142.01 0 142.01 4.314 31 4.314"/>
          <polygon fill="#D7D7D7" points="8 0 12.301 0 12.301 4.301 8 4.301"/>
          <polygon fill="#D7D7D7" points="0 0 4.301 0 4.301 4.301 0 4.301"/>
          <polygon fill="#00CD00" points="167 0 171.301 0 171.301 4.301 167 4.301"/>
          <polygon fill="#D7D400" points="160 0 164.301 0 164.301 4.301 160 4.301"/>
          <polygon fill="#FF3C00" points="153 0 157.301 0 157.301 4.301 153 4.301"/>
          <polygon fill="#00CD00" points="174 0 178.301 0 178.301 4.301 174 4.301"/>
        </g>
        <g transform="translate(8.38 378.621)">
          <polygon fill="#D8D8D8" points="31 0 142.01 0 142.01 4.314 31 4.314"/>
          <polygon fill="#D7D7D7" points="8 0 12.301 0 12.301 4.301 8 4.301"/>
          <polygon fill="#D7D7D7" points="0 0 4.301 0 4.301 4.301 0 4.301"/>
          <polygon fill="#00CD00" points="167 0 171.301 0 171.301 4.301 167 4.301"/>
          <polygon fill="#D7D400" points="160 0 164.301 0 164.301 4.301 160 4.301"/>
          <polygon fill="#FF3C00" points="153 0 157.301 0 157.301 4.301 153 4.301"/>
          <polygon fill="#00CD00" points="174 0 178.301 0 178.301 4.301 174 4.301"/>
        </g>
        <g transform="translate(8.38 386.17)">
          <polygon fill="#D8D8D8" points="31 0 142.01 0 142.01 4.314 31 4.314"/>
          <polygon fill="#D7D7D7" points="8 0 12.301 0 12.301 4.301 8 4.301"/>
          <polygon fill="#D7D7D7" points="0 0 4.301 0 4.301 4.301 0 4.301"/>
          <polygon fill="#00CD00" points="167 0 171.301 0 171.301 4.301 167 4.301"/>
          <polygon fill="#D7D400" points="160 0 164.301 0 164.301 4.301 160 4.301"/>
          <polygon fill="#FF3C00" points="153 0 157.301 0 157.301 4.301 153 4.301"/>
          <polygon fill="#00CD00" points="174 0 178.301 0 178.301 4.301 174 4.301"/>
        </g>
        <path fill="#7C7C7C" d="M196,3.22559985 L196,354.170863 C196,355.952313 194.979626,357.396463 193.72093,357.396463 L2.27906963,357.396463 C1.02037423,357.396463 1.54145729e-16,355.952313 0,354.170863 L0,3.22559985 C-1.54145729e-16,1.44415024 1.02037423,3.27246984e-16 2.27906963,0 L193.72093,0 C194.979626,1.70774491e-14 196,1.44415024 196,3.22559985 Z"/>
        <polygon fill="#D7D7D7" points="9 344 186.814 344 186.814 348.301 9 348.301"/>
        <polygon fill="#D7D7D7" points="8 23 185.82 23 185.82 27.301 8 27.301"/>
        <polygon fill="#D7D7D7" points="8 15 185.82 15 185.82 19.301 8 19.301"/>
        <polygon fill="#D7D7D7" points="8 7 185.82 7 185.82 11.301 8 11.301"/>
        <path fill="#FFF" d="M8.88029467,36 L184.93924,36 C185.425414,36 185.819535,36.5793677 185.819535,37.294054 L185.819535,334.926469 C185.819535,335.641155 185.425414,336.220523 184.93924,336.220523 L8.88029467,336.220523 C8.39412135,336.220523 8,335.641155 8,334.926469 L8,37.294054 C8,36.5793677 8.39412135,36 8.88029467,36 Z"/>
      </g>
      <g id="allocations-animejs-app3" transform="translate(20 190)">
        <g>
          <path fill="#00C176" d="M155.231996,131.223855 C155.231996,132.052078 154.745952,132.723357 154.146147,132.723357 L1.08584878,132.723357 C0.486044752,132.723357 0,132.052078 0,131.223855 L4.4408921e-16,3.88079991 C1.81609852e-16,1.7374933 1.7374933,4.83461113e-15 3.88079991,4.4408921e-15 L151.351196,4.4408921e-16 C153.494503,-1.51787392e-14 155.231996,1.7374933 155.231996,3.88079991 L155.231996,131.223855 Z"/>
          <text fill="#FFF" font-size="26.389" font-weight="bold" class="sans-serif">
            <tspan x="50.486" y="84.54">APP</tspan>
          </text>
          <path fill="#CCC" d="M3.88079991,0 L151.351196,0 C153.494503,-3.93719036e-16 155.231996,1.7374933 155.231996,3.88079991 L155.231996,17.8516796 L0,17.8516796 L0,3.88079991 C-2.62479357e-16,1.7374933 1.7374933,-9.38548593e-16 3.88079991,-1.33226763e-15 Z"/>
          <path fill="#E74C3C" d="M13.1947197,9.70199977 C13.1947197,11.6311916 11.6311916,13.1947197 9.70199977,13.1947197 C7.7728079,13.1947197 6.20927985,11.6311916 6.20927985,9.70199977 C6.20927985,7.7728079 7.7728079,6.20927985 9.70199977,6.20927985 C11.6311916,6.20927985 13.1947197,7.7728079 13.1947197,9.70199977"/>
          <path fill="#F1C40F" d="M25.6132794,9.70199977 C25.6132794,11.6311916 24.0497513,13.1947197 22.1205595,13.1947197 C20.1913676,13.1947197 18.6278396,11.6311916 18.6278396,9.70199977 C18.6278396,7.7728079 20.1913676,6.20927985 22.1205595,6.20927985 C24.0497513,6.20927985 25.6132794,7.7728079 25.6132794,9.70199977"/>
          <path fill="#2ECC71" d="M37.2556791,9.70199977 C37.2556791,11.6311916 35.6921511,13.1947197 33.7629592,13.1947197 C31.8337673,13.1947197 30.2702393,11.6311916 30.2702393,9.70199977 C30.2702393,7.7728079 31.8337673,6.20927985 33.7629592,6.20927985 C35.6921511,6.20927985 37.2556791,7.7728079 37.2556791,9.70199977"/>
        </g>
      </g>
      <g transform="translate(20 47)">
        <path fill="#EC3344" d="M155.231996,131.223855 C155.231996,132.052078 154.745952,132.723357 154.146147,132.723357 L1.08584878,132.723357 C0.486044752,132.723357 0,132.052078 0,131.223855 L4.4408921e-16,3.88079991 C1.81609852e-16,1.7374933 1.7374933,4.83461113e-15 3.88079991,4.4408921e-15 L151.351196,4.4408921e-16 C153.494503,-1.51787392e-14 155.231996,1.7374933 155.231996,3.88079991 L155.231996,131.223855 Z"/>
        <text fill="#FFF" font-size="26.389" font-weight="bold" class="sans-serif">
          <tspan x="50.486" y="84.54">APP</tspan>
        </text>
        <path fill="#CCC" d="M3.88079991,0 L151.351196,0 C153.494503,-3.93719036e-16 155.231996,1.7374933 155.231996,3.88079991 L155.231996,17.8516796 L0,17.8516796 L0,3.88079991 C-2.62479357e-16,1.7374933 1.7374933,-9.38548593e-16 3.88079991,-1.33226763e-15 Z"/>
        <path fill="#E74C3C" d="M13.1947197,9.70199977 C13.1947197,11.6311916 11.6311916,13.1947197 9.70199977,13.1947197 C7.7728079,13.1947197 6.20927985,11.6311916 6.20927985,9.70199977 C6.20927985,7.7728079 7.7728079,6.20927985 9.70199977,6.20927985 C11.6311916,6.20927985 13.1947197,7.7728079 13.1947197,9.70199977"/>
        <path fill="#F1C40F" d="M25.6132794,9.70199977 C25.6132794,11.6311916 24.0497513,13.1947197 22.1205595,13.1947197 C20.1913676,13.1947197 18.6278396,11.6311916 18.6278396,9.70199977 C18.6278396,7.7728079 20.1913676,6.20927985 22.1205595,6.20927985 C24.0497513,6.20927985 25.6132794,7.7728079 25.6132794,9.70199977"/>
        <path fill="#2ECC71" d="M37.2556791,9.70199977 C37.2556791,11.6311916 35.6921511,13.1947197 33.7629592,13.1947197 C31.8337673,13.1947197 30.2702393,11.6311916 30.2702393,9.70199977 C30.2702393,7.7728079 31.8337673,6.20927985 33.7629592,6.20927985 C35.6921511,6.20927985 37.2556791,7.7728079 37.2556791,9.70199977"/>
      </g>
    </g>
  </g>
</svg>
<script src="anime.min.js"></script>
<script src="isScrolledIntoView.js"></script>
<script>
(function() {
  const svg = document.querySelector('#allocations')
  const wrapper = document.createElement('div')
  wrapper.classList = 'relative'
  const restart = document.createElement('div')
  restart.classList = 'restart'
  restart.innerHTML = '<span>Restart</span>'
  wrap(svg, wrapper)
  wrapper.appendChild(restart)
  const basicTimeline = anime.timeline({
    autoplay: false,
  });
  basicTimeline
  .add({
    begin: function() {
      wrapper.onclick = function() {}
      restart.classList.add('inactive')
    }
  })
  .add({
    targets: ['#allocations-animejs-app1', '#allocations-animejs-app2', '#allocations-animejs-app3',],
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    complete: function() {
      wrapper.onclick = basicTimeline.restart
      restart.classList.remove('inactive')
    }
  })
  wrapper.onclick = basicTimeline.restart
  onScrollIntoView(svg, function() {
    setTimeout(basicTimeline.play, 1000)
  });
  function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }
})();
</script>
```

They could all be deployed on the same node, or they could be deployed across two nodes, depending on the physical resources available.

Particularly in the embedded world where resources are scarce, you don't want deployments to be placed just anywhere.

**You want to have a strict set of rules for deployments.**

As an example, each solar panel should have only one app running at any given time.

In the case of an application responsible for tilting the solar panels to track the trajectory of the sun, you don't want to have two applications deployed on the same node that are trying to drive the same motor.

## Advanced deployments in Kubernetes

Kubernetes can use several strategies to allocate containers to your nodes.

The most straightforward strategy is a _[Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)_.

In a _Deployment_, you specify the number of instances of your application and Kubernetes will find the space to allocate them.

This is the most common deployment type, but while it's useful for cloud deployments where you don't care which specific node is running our application (you just care that it's being run by _something_), this is less useful in the embedded world.

Other strategies include _[StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)_ and _[ReplicaSet](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/)_.

Each of them comes with different trade-offs, but doesn't serve our goal of having our application run on every available node.

For this you need a _[DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)_, a strategy that deploys one application per node.

If you add a new IoT-connected solar panel to the cluster, Kubernetes will automatically schedule and deploy the application on that embedded device (node) too.

```include
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 725" id="daemonset">
  <defs>
    <linearGradient id="linearGradient-1" x1="50%" x2="50%" y1="0%" y2="100%">
      <stop offset="0%" stop-color="#E8E8E8"/>
      <stop offset="100%" stop-color="#B7B3B3"/>
    </linearGradient>
    <linearGradient x1="50%" x2="50%" y1="0%" y2="100%">
      <stop offset="0%" stop-color="#BBB7B7"/>
      <stop offset="100%" stop-color="#888"/>
    </linearGradient>
  </defs>
  <g fill="none" fill-rule="evenodd">
    <g fill-rule="nonzero" transform="translate(338 63)">
      <path fill="#326CE5" d="M67.5137286,0.0117203812 C66.3117084,0.0727598226 65.1339837,0.373188117 64.0496461,0.895380572 L16.7797314,23.6633424 C14.3013695,24.8564681 12.5012533,27.1129595 11.8889064,29.7941159 L0.227099842,80.9367112 C-0.31695066,83.3173305 0.125730558,85.8167503 1.45434024,87.865826 C1.61379744,88.1137668 1.78529216,88.3537592 1.96820937,88.5849425 L34.6865593,129.59287 C36.4021247,131.742381 39.0032487,132.993978 41.7537713,132.993438 L94.2228324,132.981249 C96.9723262,132.983269 99.5732668,131.734004 101.290044,129.586775 L133.996303,88.5727541 C135.712787,86.4221651 136.355898,83.6069207 135.743458,80.9245228 L124.063515,29.7819275 C123.451168,27.1007711 121.651052,24.8442797 119.17269,23.651154 L71.89673,0.895380572 C70.5327966,0.238503883 69.0256905,-0.0653448868 67.5137286,0.0117203812 Z"/>
      <path fill="#FFF" d="M67.982118,17.4162174 C66.4195767,17.4163773 65.1526293,18.8351265 65.152815,20.5852057 C65.1528169,20.612065 65.1582705,20.6377309 65.1588509,20.6644304 C65.1565487,20.9022234 65.1451541,21.1887 65.152815,21.3957354 C65.1900786,22.4051312 65.4083518,23.1776799 65.5397282,24.107658 C65.777734,26.0981064 65.9771665,27.7480669 65.8540952,29.2816408 C65.7344056,29.8599373 65.3118596,30.388819 64.9351763,30.7564392 L64.8686756,31.9630924 C63.1707417,32.1049012 61.46145,32.3645769 59.7541664,32.7553395 C52.4077269,34.436791 46.0825719,38.2514513 41.2669686,43.4019212 C40.9544936,43.1870287 40.407822,42.791693 40.2452662,42.6706162 C39.7401181,42.7393823 39.2295784,42.8964998 38.5646119,42.5060726 C37.2984557,41.6469101 36.1452686,40.4609675 34.7498893,39.0323739 C34.110519,38.3490055 33.6475116,37.6982767 32.8878693,37.0395678 C32.7153602,36.8899779 32.4520928,36.6876541 32.2591353,36.5337485 C31.6652468,36.0564365 30.9647752,35.80751 30.2882961,35.7841609 C29.4185364,35.7541404 28.5812465,36.0969352 28.0333174,36.7897053 C27.0592227,38.021297 27.3710922,39.9037092 28.7285521,40.994709 C28.7423262,41.0057663 28.7569941,41.0143625 28.7708708,41.02518 C28.9574055,41.1776074 29.1858275,41.3729165 29.3572861,41.5005282 C30.1633947,42.1005006 30.8997544,42.4076292 31.7029476,42.8839135 C33.3951126,43.9373457 34.7979381,44.8108261 35.9106289,45.8639813 C36.3451364,46.3308796 36.4210797,47.1535977 36.4789078,47.5094175 L37.3857356,48.3260414 C32.5312476,55.6905128 30.2845508,64.7871238 31.6122745,74.0557885 L30.4273527,74.4031584 C30.1150557,74.8096879 29.6737599,75.4493613 29.2121937,75.6402826 C27.7564075,76.1025083 26.1180021,76.2722452 24.1400031,76.4812834 C23.2113513,76.5591235 22.4100792,76.512671 21.4255649,76.7006749 C21.208878,76.7420531 20.9069619,76.8213441 20.669875,76.8774069 C20.6616338,76.879162 20.6539342,76.8816192 20.645693,76.8834914 C20.6327701,76.8865141 20.6157923,76.8928326 20.6033743,76.8956798 C18.9357512,77.3018544 17.8644659,78.8469965 18.2093487,80.3693785 C18.5543128,81.8921173 20.1832136,82.8181327 21.8608423,82.4535977 C21.8729527,82.450809 21.8905379,82.4503409 21.903161,82.4475132 C21.9221004,82.4431449 21.9387744,82.4338817 21.9575706,82.4292403 C22.1914307,82.3774912 22.4845019,82.3199151 22.6890784,82.2646967 C23.6570077,82.0034492 24.3580171,81.619596 25.2281965,81.2835292 C27.1002646,80.6066782 28.6507787,80.0412429 30.1613402,79.8209192 C30.792237,79.7711086 31.4569404,80.2133199 31.7875848,80.399869 L33.0208708,80.1865717 C35.8589141,89.0563885 41.8065404,96.2255566 49.3377271,100.724053 L48.823858,101.967272 C49.0090772,102.450015 49.2133654,103.103174 49.0753941,103.579911 C48.5262327,105.015452 47.5855905,106.530672 46.5144696,108.219929 C45.9958415,109.000363 45.4650584,109.606018 44.9970443,110.499163 C44.8850523,110.712878 44.7424206,111.041172 44.6343132,111.267034 C43.9071407,112.835412 44.4405393,114.641801 45.8373715,115.319682 C47.2429789,116.00182 48.9877099,115.282368 49.7427769,113.710811 C49.7439376,113.708588 49.7477487,113.70695 49.7488127,113.704727 C49.7495866,113.702971 49.7480389,113.700339 49.7488127,113.698642 C49.8563611,113.475828 50.0087275,113.182951 50.0994528,112.973431 C50.5003201,112.047693 50.6337046,111.254365 50.9155979,110.359016 C51.6642015,108.463446 52.0755,106.474513 53.1060259,105.235179 C53.3882172,104.895809 53.8482822,104.765292 54.3252708,104.636555 L54.9660958,103.466467 C61.5316728,106.006884 68.8807839,106.688589 76.2221413,105.008301 C77.8968894,104.624986 79.5136973,104.128892 81.0766932,103.533503 C81.2567975,103.855536 81.5915064,104.474585 81.6812452,104.63046 C82.1659681,104.789432 82.6950429,104.871526 83.1261243,105.514121 C83.8971243,106.841971 84.4243922,108.41285 85.0667359,110.310262 C85.3486757,111.205596 85.4880109,111.998959 85.8889265,112.924678 C85.9803038,113.135674 86.131908,113.432664 86.2395666,113.655983 C86.9930453,115.232645 88.7433054,115.954556 90.1510176,115.270948 C91.5476776,114.592706 92.0816643,112.786481 91.3540759,111.218299 C91.2459549,110.992445 91.0973009,110.664138 90.9852992,110.450429 C90.5172387,109.557309 89.9865408,108.957693 89.4678739,108.17729 C88.396664,106.488088 87.5082203,105.084806 86.9589834,103.649293 C86.7293291,102.908906 86.9977289,102.448443 87.1766221,101.967291 C87.0694897,101.843502 86.8402378,101.144312 86.7050716,100.815486 C94.5318233,96.1569445 100.304793,88.7204251 103.015882,80.1317433 C103.38198,80.1897446 104.018286,80.3032314 104.224986,80.3450406 C104.650502,80.0621329 105.041748,79.6930052 105.808912,79.7539024 C107.319483,79.9741461 108.869953,80.5397589 110.742056,81.2165124 C111.612253,81.5525344 112.313233,81.9425773 113.281174,82.2037741 C113.485752,82.2589808 113.778818,82.3104862 114.012682,82.3622235 C114.031486,82.3668649 114.048142,82.3761476 114.067092,82.3804964 C114.079724,82.3833436 114.0973,82.3837922 114.10941,82.3865809 C115.787136,82.7506635 117.416327,81.8251902 117.760904,80.3023617 C118.1054,78.77989 117.03461,77.234389 115.366878,76.828663 C115.124297,76.7730585 114.780269,76.6786226 114.544688,76.6336483 C113.560164,76.4456971 112.758905,76.4920482 111.830249,76.4142568 C109.852241,76.205322 108.213868,76.0354038 106.758059,75.5732561 C106.164484,75.341134 105.742212,74.6291433 105.536854,74.3361318 L104.394251,74.0009504 C104.986666,69.6805136 104.826927,65.1840762 103.80179,60.6851054 C102.767109,56.1442456 100.938561,51.991188 98.4998699,48.3321454 C98.7929664,48.0635537 99.3464728,47.5694606 99.5034261,47.4241084 C99.5493063,46.9123567 99.5098876,46.3758012 100.035432,45.8091432 C101.148067,44.7559295 102.551004,43.8825972 104.243113,42.8290754 C105.046281,42.3527482 105.788743,42.0457054 106.59482,41.4456901 C106.777105,41.3100067 107.026016,41.0951337 107.217509,40.9398708 C108.57468,39.8485044 108.887151,37.9662054 107.912743,36.7348672 C106.938335,35.503529 105.050143,35.387544 103.692971,36.4789104 C103.499793,36.6331378 103.237665,36.8343285 103.064237,36.9847297 C102.30463,37.6434814 101.835507,38.2941342 101.196171,38.9775358 C99.8008676,40.4062035 98.6475605,41.598098 97.3814489,42.4573287 C96.832804,42.7793096 96.0291949,42.6679016 95.6645117,42.6462491 L94.5884093,43.4202136 C88.4521977,36.9339147 80.0976074,32.7869494 71.1016059,31.981375 C71.0764449,31.601346 71.0434819,30.9144166 71.0351052,30.7076855 C70.6668199,30.352437 70.2219258,30.0491483 70.1101408,29.2816408 C69.9870695,27.7480669 70.1925475,26.0981064 70.4305533,24.107658 C70.5619297,23.1776799 70.7802029,22.4051312 70.8174665,21.3957354 C70.8259399,21.1662752 70.8123399,20.8333111 70.8114307,20.5852057 C70.8112449,18.8351265 69.544669,17.4160575 67.9821277,17.4162174 L67.982118,17.4162174 Z M64.4394437,39.5381932 L63.5991166,54.4994744 L63.5386614,54.5299454 C63.4822997,55.8683993 62.3895368,56.9371576 61.0479075,56.9371576 C60.498334,56.9371576 59.9910656,56.7592477 59.5788463,56.4557152 L59.5546642,56.4679036 L47.3850341,47.7714685 C51.1252565,44.0640155 55.9092955,41.3242077 61.4227297,40.0622951 C62.4298629,39.8317819 63.4365472,39.6607404 64.4394437,39.5381932 Z M71.5308378,39.5381932 C77.9678106,40.3362556 83.9207686,43.274444 88.4824736,47.7775627 L76.3914352,56.4191499 L76.3491166,56.4008771 C75.2759257,57.191016 73.7638726,56.9949678 72.9273527,55.9377172 C72.5846791,55.5045975 72.4048806,54.9953303 72.383256,54.4812015 L72.3711649,54.475117 L71.5308378,39.5381932 Z M42.971805,53.3598574 L54.0834693,63.3787357 L54.0713783,63.4396778 C55.074329,64.318603 55.2222285,65.8438069 54.3857453,66.9011881 C54.0430949,67.3343254 53.5844325,67.6248368 53.0920042,67.7604714 L53.0799132,67.8092251 L38.8366699,71.9532867 C38.1117338,65.2710761 39.6740565,58.7754361 42.971805,53.3598574 Z M92.9138392,53.3659419 C94.5648173,56.0634939 95.815021,59.0763885 96.5592873,62.3427106 C97.2946275,65.5698678 97.4791715,68.7912546 97.1759302,71.9045233 L82.8601408,67.7482733 L82.8480497,67.6873312 C81.5661095,67.3341518 80.7782709,66.0196399 81.0767126,64.7011691 C81.198983,64.1610526 81.483401,63.7041294 81.8686756,63.3665376 L81.8626398,63.3360665 L92.9138489,53.3659419 L92.9138392,53.3659419 Z M65.7029573,64.1526904 L70.2552332,64.1526904 L73.0845362,67.7178022 L72.068889,72.1665742 L67.982118,74.1471919 L63.883256,72.16048 L62.8676087,67.711708 L65.7029573,64.1526904 Z M80.2968406,76.3532952 C80.4902914,76.343447 80.6828988,76.3610178 80.8711649,76.3959547 L80.895347,76.3654837 L95.6282773,78.8762974 C93.4721066,84.9828111 89.3461974,90.2729894 83.8334693,93.8132018 L78.1144082,79.887936 L78.1325351,79.8635592 C77.6071823,78.6330186 78.132922,77.189994 79.3416389,76.6031578 C79.6511018,76.4529165 79.9744142,76.3697233 80.2968309,76.3532952 L80.2968406,76.3532952 Z M55.5525305,76.4142373 C56.6768501,76.430131 57.6853162,77.2167714 57.9465561,78.3704782 C58.0688575,78.9105869 58.0093328,79.4457403 57.8075092,79.9184071 L57.8498278,79.9732549 L52.1912218,93.7583539 C46.9007328,90.3361196 42.6868396,85.2120255 40.432687,78.9250609 L55.0386614,76.4264355 L55.0628435,76.4569065 C55.2262195,76.4265993 55.3919132,76.4119752 55.5525305,76.4142471 L55.5525305,76.4142373 Z M67.8914352,82.4536074 C68.2830784,82.4390983 68.680477,82.5201035 69.0582204,82.70347 C69.5533746,82.9438314 69.9358808,83.3222885 70.1766415,83.7760506 L70.2310511,83.7760506 L77.4312645,96.8907867 C76.496813,97.2065603 75.5361461,97.4764313 74.5535974,97.7013164 C69.0469458,98.9616766 63.5577904,98.5797931 58.5873812,96.872504 L65.769458,83.7821448 L65.781549,83.7821448 C66.2125065,82.9700238 67.029822,82.4855177 67.8914352,82.4536074 Z"/>
    </g>
    <g fill-rule="nonzero" transform="rotate(180 238 149)">
      <g id="daemonset-animejs-wifi-3" fill="#F8E71C">
        <path d="M67.8405848,0.0133962275 C94.1681871,0.36973585 116.175556,9.29698113 134.419532,27.2559623 C138.199064,30.977434 139.062573,35.4490943 136.644211,38.5329057 C134.177427,41.6783396 129.27614,42.0293208 124.853684,39.2723774 C123.590129,38.4622036 122.411362,37.5278275 121.335088,36.483283 C92.2690058,8.88169811 47.6893567,7.98415094 17.4019883,34.4416981 C14.4698246,37.0030566 11.2659649,38.7526038 7.2497076,38.4793208 C4.44128655,38.2890943 2.18163743,37.0887925 0.917309942,34.484566 C-0.379298246,31.8053208 0.395438596,29.3645283 2.08748538,27.1541509 C2.85010228,26.2046086 3.70028209,25.3282455 4.62690058,24.5365283 C22.814386,8.28422642 44.2433918,0.417962265 67.8405848,0.0133962275 Z"/>
      </g>
      <g id="daemonset-animejs-wifi-2" fill="#FFF67F" transform="translate(20 30)">
        <path d="M49.7128655,0.503207547 C67.8492398,0.867584906 82.8490058,7.70769811 96.1890058,18.6497358 C97.8622222,20.0215094 99.048538,21.8835849 99.8421053,23.9144528 C100.850877,26.4918868 101.017661,29.0853962 99.0700585,31.3198868 C97.0740351,33.605283 94.402807,33.9857358 91.5836257,33.3561132 C88.5546199,32.6809434 86.2223392,30.8161887 83.9546199,28.8013962 C65.8693567,12.6776981 39.0467836,11.5631321 19.9312281,26.1221509 C18.2176608,27.4269434 16.6466667,28.9166038 15.0218713,30.3339245 C12.5281871,32.5067925 9.7251462,33.8624906 6.31684211,33.5918868 C1.87824561,33.2409057 -0.698830409,29.508717 0.519766082,25.2647925 C1.15769696,23.0942633 2.39339618,21.14514 4.08678363,19.6383774 C17.1470175,7.6889434 32.3189474,0.757735849 49.7128655,0.503207547 Z"/>
      </g>
      <g id="daemonset-animejs-wifi-1" fill="#FFF9AC" transform="translate(38 62)">
        <path d="M35.0969591,0.271018868 C44.488837,0.440510178 53.419411,4.35744937 59.885848,11.1433962 C62.1697076,13.5198868 63.7460819,16.1991321 62.8449123,19.7169811 C61.7043275,24.1993585 56.2919298,26.2998868 52.5231579,22.8222264 C40.7945029,11.9980755 24.4792982,11.9176981 12.0431579,22.2033208 C8.57298246,25.0727925 6.34561404,25.308566 3.57216374,23.0955094 C0.79871345,20.8824528 0.12619883,17.1368679 1.97157895,13.7181509 C2.96690058,11.8748302 4.42222222,10.4226792 6.03625731,9.10984906 C13.1595322,3.33339623 22.3460819,0.252264151 35.0969591,0.271018868 Z"/>
      </g>
    </g>
    <g id="daemonset-animejs-solar2" fill-rule="nonzero" transform="translate(412 334)">
      <g transform="translate(14.512 13.453)">
        <rect width="127.808" height="197.867" x=".84" y=".84" fill="url(#linearGradient-1)" stroke="url(#linearGradient-2)" stroke-width="1.68"/>
        <rect width="22.37" height="22.401" x="100.465" y="171.521" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="171.521" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="171.521" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="171.521" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="171.521" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="147.979" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="147.979" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="147.979" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="147.979" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="147.979" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="124.437" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="124.437" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="124.437" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="124.437" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="124.437" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="100.895" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="100.895" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="100.895" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="100.895" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="100.895" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="77.353" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="77.353" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="77.353" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="77.353" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="77.353" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="53.811" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="53.811" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="53.811" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="53.811" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="53.811" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="30.268" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="30.268" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="30.268" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="30.268" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="30.268" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="5.605" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="5.605" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="5.605" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="5.605" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="5.605" fill="#1B4996" rx="4.916"/>
        <rect width="1" height="188.087" x="117.209" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="107.163" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="93.767" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="83.721" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="69.209" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="59.163" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="45.767" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="35.721" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="22.326" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="12.279" y="5.605" fill="#C3BFBF"/>
      </g>
      <g>
        <path fill="#326CE5" d="M14.4078545,0.00246976817 C14.1513358,0.0153322543 13.900002,0.0786397599 13.6685975,0.188678336 L3.58090028,4.98643841 C3.05200226,5.23785883 2.66784613,5.71335613 2.53716744,6.27834061 L0.0484645353,17.055322 C-0.0676392653,17.5569761 0.0268316923,18.0836643 0.310365359,18.515454 C0.344394529,18.5677012 0.380992582,18.6182734 0.420028266,18.6669893 L7.40233003,27.308351 C7.76844248,27.7613051 8.32353872,28.0250468 8.91051753,28.024933 L20.1077454,28.0223646 C20.6945046,28.0227902 21.2495617,27.7595397 21.6159329,27.3070668 L28.5956543,18.6644209 C28.9619627,18.2112398 29.0992068,17.6179997 28.9685082,17.0527536 L26.4759348,6.27577222 C26.3452562,5.71078773 25.9611,5.23529043 25.432202,4.98387001 L15.3432146,0.188678336 C15.0521426,0.0502585354 14.7305167,-0.0137697472 14.4078545,0.00246976817 Z"/>
        <path fill="#FFF" d="M14.5078118,3.67001811 C14.1743556,3.67005181 13.9039811,3.96901657 13.9040207,4.33780056 C13.9040211,4.34346048 13.9051849,4.3488689 13.9053088,4.35449512 C13.9048175,4.40460387 13.9023858,4.46497141 13.9040207,4.50859876 C13.911973,4.72130288 13.9585539,4.88409756 13.9865904,5.08006644 C14.0373824,5.49950203 14.0799425,5.84718862 14.0536783,6.17034971 C14.0281358,6.29221076 13.9379618,6.40365892 13.8575752,6.48112539 L13.8433836,6.7353964 C13.4810338,6.76527894 13.1162602,6.81999889 12.7519151,6.90234201 C11.1841387,7.2566645 9.83431084,8.06050568 8.80663079,9.14583421 C8.73994666,9.10055116 8.62328349,9.01724437 8.58859306,8.99173056 C8.48079128,9.00622124 8.37183888,9.03932969 8.22993085,8.95705724 C7.95972517,8.77601094 7.71362777,8.52610415 7.41584504,8.22506494 C7.27939941,8.08106269 7.1805907,7.94393839 7.01847827,7.80513252 C6.98166374,7.77361031 6.92548083,7.73097579 6.88430248,7.69854416 C6.75756292,7.59796298 6.60807788,7.54550815 6.46371298,7.54058793 C6.2781008,7.53426187 6.09941786,7.60649703 5.98248634,7.75248044 C5.77460841,8.01200659 5.84116332,8.40867635 6.13085381,8.63857638 C6.13379329,8.64090643 6.13692351,8.64271787 6.13988487,8.64499737 C6.17969256,8.6771175 6.22843924,8.71827386 6.2650296,8.74516474 C6.43705824,8.87159342 6.59420204,8.93631284 6.76560851,9.03667746 C7.12672717,9.25866109 7.42609896,9.44272453 7.66355419,9.6646498 C7.75628081,9.76303655 7.7724876,9.93640315 7.78482847,10.011383 L7.97835124,10.1834654 C6.94237294,11.7353376 6.46291371,13.6522135 6.7462583,15.6053452 L6.49338854,15.6785445 C6.42674239,15.7642101 6.33256709,15.8990047 6.23406595,15.9392364 C5.92339202,16.0366386 5.57374601,16.0724062 5.15162856,16.1164556 C4.95344844,16.1328584 4.78245192,16.1230698 4.57235038,16.1626867 C4.52610804,16.1714061 4.46167724,16.1881147 4.4110814,16.1999284 C4.40932267,16.2002983 4.40767953,16.2008161 4.4059208,16.2012106 C4.40316297,16.2018475 4.39953981,16.203179 4.39688973,16.203779 C4.04100847,16.2893698 3.81238943,16.6149686 3.8859896,16.9357713 C3.95960711,17.2566492 4.3072248,17.451783 4.66524132,17.3749667 C4.66782575,17.374379 4.67157854,17.3742804 4.67427238,17.3736845 C4.67831417,17.372764 4.68187251,17.370812 4.68588374,17.369834 C4.73579095,17.3589292 4.7983342,17.3467965 4.84199212,17.3351607 C5.0485543,17.2801095 5.19815412,17.1992223 5.38385589,17.1284049 C5.78336699,16.9857761 6.11425647,16.8666252 6.43661979,16.8201977 C6.57125715,16.8097014 6.71310903,16.902886 6.78367064,16.9421964 L7.04686161,16.8972495 C7.65251793,18.7663343 8.9217788,20.2770514 10.5289814,21.2249934 L10.4193185,21.4869696 C10.4588455,21.5886953 10.5024419,21.7263316 10.4729979,21.8267916 C10.3558034,22.129295 10.1550645,22.4485883 9.92648052,22.8045558 C9.81580201,22.9690119 9.70252957,23.0966381 9.60265241,23.2848455 C9.57875261,23.3298803 9.5483141,23.3990597 9.5252433,23.4466543 C9.37006012,23.7771495 9.48389073,24.1577995 9.78198352,24.3006453 C10.081949,24.4443883 10.4542856,24.2927823 10.6154216,23.9616173 C10.6156693,23.9611488 10.6164826,23.9608036 10.6167097,23.9603352 C10.6168748,23.9599653 10.6165446,23.9594105 10.6167097,23.959053 C10.6396612,23.9121007 10.6721771,23.8503845 10.6915385,23.8062336 C10.7770861,23.6111581 10.8055512,23.4439848 10.865709,23.255313 C11.0254657,22.8558706 11.1132394,22.4367544 11.3331601,22.1755968 C11.3933815,22.1040832 11.4915623,22.07658 11.5933546,22.049452 L11.7301107,21.8028862 C13.1312462,22.3382135 14.6995927,22.4818652 16.2662846,22.1277881 C16.6236864,22.0470143 16.9687234,21.9424753 17.3022765,21.8170124 C17.3407119,21.8848726 17.4121409,22.0153212 17.4312917,22.0481678 C17.5347346,22.0816671 17.6476425,22.0989662 17.739638,22.2343764 C17.9041743,22.5141867 18.0166966,22.8452087 18.1537767,23.2450395 C18.2139445,23.4337079 18.2436795,23.6008886 18.3292374,23.79596 C18.3487379,23.840422 18.3810912,23.9030049 18.4040662,23.9500636 C18.5648633,24.2823045 18.9383798,24.4344286 19.2387944,24.2903758 C19.5368505,24.147454 19.6508066,23.7668385 19.4955347,23.4363848 C19.472461,23.3887919 19.4407373,23.3196096 19.4168354,23.274576 C19.3169483,23.0863739 19.2036941,22.9600205 19.0930073,22.7955705 C18.8644044,22.4396149 18.6748049,22.1439094 18.5575943,21.8414121 C18.5085846,21.6853947 18.5658628,21.5883641 18.6040397,21.4869737 C18.581177,21.4608883 18.5322532,21.3135521 18.5034079,21.2442605 C20.1736859,20.2625932 21.405674,18.6955387 21.9842376,16.8856958 C22.062365,16.8979181 22.1981567,16.9218325 22.2422679,16.9306427 C22.3330756,16.8710272 22.4165701,16.7932431 22.5802877,16.8060756 C22.9026531,16.8524863 23.2335331,16.9716746 23.6330516,17.1142829 C23.8187571,17.1850908 23.9683507,17.2672823 24.1749154,17.3223228 C24.2185737,17.3339562 24.2811157,17.3448096 24.3310238,17.3557119 C24.3350367,17.35669 24.3385913,17.3586461 24.3426351,17.3595625 C24.345331,17.3601624 24.3490818,17.360257 24.3516662,17.3608446 C24.7097034,17.4375656 25.057383,17.242546 25.1309179,16.9216492 C25.2044355,16.6008276 24.9759222,16.2751532 24.6200178,16.1896569 C24.5682495,16.1779397 24.4948318,16.1580398 24.4445571,16.1485626 C24.2344535,16.1089567 24.0634599,16.118724 23.8652789,16.1023315 C23.4431594,16.0583039 23.0935204,16.022498 22.7828416,15.9251123 C22.6561689,15.8761986 22.5660535,15.7261649 22.5222288,15.6644203 L22.2783901,15.5937895 C22.4048151,14.683369 22.3707258,13.7358609 22.1519552,12.787819 C21.9311477,11.83095 21.5409241,10.9558004 21.0204921,10.1847517 C21.0830407,10.1281529 21.2011625,10.0240355 21.2346573,9.9934063 C21.2444484,9.88556785 21.2360362,9.77250263 21.3481906,9.65309408 C21.5856339,9.43115648 21.8850296,9.24712427 22.2461363,9.02512174 C22.4175374,8.92474808 22.5759834,8.86004674 22.7480054,8.73360902 C22.786906,8.70501724 22.8400252,8.65973831 22.880891,8.62702066 C23.17052,8.39704337 23.2372033,8.00039745 23.0292585,7.74092472 C22.8213137,7.48145199 22.4183615,7.45701116 22.1287325,7.68698845 C22.0875071,7.71948788 22.0315674,7.76188364 21.9945567,7.7935768 C21.8324517,7.93239172 21.732338,8.06949999 21.5958998,8.21350922 C21.2981332,8.51456405 21.0520102,8.76572504 20.781814,8.94678572 C20.6647297,9.01463489 20.4932345,8.99115853 20.4154088,8.98659583 L20.1857618,9.14968885 C18.8762556,7.78286886 17.0933334,6.90900299 15.1735301,6.73924899 C15.1681606,6.6591677 15.1611261,6.51441506 15.1593385,6.47085181 C15.0807441,6.39599237 14.9858009,6.3320821 14.9619452,6.17034971 C14.935681,5.84718862 14.9795313,5.49950203 15.0303233,5.08006644 C15.0583598,4.88409756 15.1049407,4.72130288 15.112893,4.50859876 C15.1147013,4.46024597 15.1117989,4.39008238 15.1116049,4.33780056 C15.1115653,3.96901657 14.84127,3.66998441 14.5078138,3.67001811 L14.5078118,3.67001811 Z M13.7517828,8.3316533 L13.5724517,11.484357 L13.5595502,11.490778 C13.5475222,11.7728226 13.3143198,11.9980358 13.0280076,11.9980358 C12.9107252,11.9980358 12.8024709,11.9605459 12.7145007,11.8965842 L12.7093401,11.8991526 L10.1122645,10.0666035 C10.9104515,9.28535348 11.9313955,8.70800973 13.107997,8.44209424 C13.3229256,8.39351954 13.5377584,8.35747696 13.7517828,8.3316533 Z M15.2651309,8.3316533 C16.6388214,8.49982434 17.9092201,9.11897168 18.8827167,10.0678877 L16.302413,11.888879 L16.2933819,11.8850285 C16.0643562,12.0515299 15.7416746,12.0102178 15.563156,11.7874295 C15.4900273,11.6961607 15.4516571,11.5888458 15.4470423,11.4805064 L15.444462,11.4792243 L15.2651309,8.3316533 Z M9.17045361,11.2442121 L11.5417527,13.355432 L11.5391724,13.368274 C11.7532084,13.5534848 11.7847711,13.8748821 11.6062603,14.0976979 C11.5331365,14.1889704 11.4352551,14.2501882 11.3301678,14.2787697 L11.3275875,14.2890433 L8.28798975,15.1622973 C8.13328382,13.7541939 8.46669332,12.3854055 9.17045361,11.2442121 Z M19.828398,11.2454943 C20.1807271,11.8139337 20.4475284,12.4488235 20.6063595,13.1371165 C20.7632858,13.8171566 20.8026686,14.4959806 20.737955,15.1520216 L17.6828755,14.2761993 L17.6802952,14.2633573 C17.406721,14.1889339 17.2385913,13.9119344 17.3022807,13.6341007 C17.3283739,13.5202851 17.3890705,13.4240004 17.4712906,13.3528616 L17.4700025,13.3464406 L19.8284,11.2454943 L19.828398,11.2454943 Z M14.0214245,13.518523 L14.9929089,13.518523 L15.5966999,14.2697783 L15.3799544,15.2072421 L14.5078118,15.6246061 L13.6330888,15.2059579 L13.4163433,14.2684941 L14.0214245,13.518523 Z M17.1358511,16.0894854 C17.1771347,16.0874102 17.2182383,16.0911128 17.2584155,16.0984748 L17.2635761,16.0920538 L20.4076761,16.621143 C19.9475357,17.9079331 19.0670408,19.0227016 17.8905899,19.7687099 L16.6701063,16.8343197 L16.6739747,16.8291829 C16.5618611,16.5698783 16.6740572,16.2657981 16.932005,16.1421375 C16.9980463,16.1104781 17.0670433,16.0929472 17.135849,16.0894854 L17.1358511,16.0894854 Z M11.8552596,16.1023274 C12.0951965,16.1056766 12.3104095,16.2714408 12.3661597,16.5145547 C12.3922596,16.6283686 12.3795567,16.7411384 12.3364862,16.8407407 L12.3455173,16.8522985 L11.1379352,19.7571521 C10.0089115,19.0360046 9.10964019,17.9562341 8.62858983,16.6314186 L11.7455967,16.1048979 L11.7507573,16.1113188 C11.7856228,16.1049324 11.8209828,16.1018507 11.8552596,16.1023295 L11.8552596,16.1023274 Z M14.4884595,17.3749687 C14.5720386,17.3719113 14.656846,17.3889811 14.7374588,17.4276208 C14.8431278,17.4782708 14.9247571,17.5580208 14.9761369,17.6536395 L14.9877483,17.6536395 L16.5243191,20.4172315 C16.3249013,20.4837726 16.1198889,20.5406409 15.9102068,20.5880297 C14.7350527,20.853618 13.5636324,20.7731459 12.5029158,20.4133789 L14.0356162,17.6549237 L14.0381965,17.6549237 C14.1301655,17.4837901 14.3045858,17.381693 14.4884595,17.3749687 Z"/>
      </g>
    </g>
    <g id="daemonset-animejs-solar4" fill-rule="nonzero" transform="translate(579 334)">
      <g transform="translate(14.512 13.453)">
        <rect width="127.808" height="197.867" x=".84" y=".84" fill="url(#linearGradient-1)" stroke="url(#linearGradient-2)" stroke-width="1.68"/>
        <rect width="22.37" height="22.401" x="100.465" y="171.521" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="171.521" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="171.521" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="171.521" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="171.521" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="147.979" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="147.979" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="147.979" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="147.979" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="147.979" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="124.437" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="124.437" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="124.437" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="124.437" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="124.437" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="100.895" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="100.895" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="100.895" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="100.895" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="100.895" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="77.353" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="77.353" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="77.353" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="77.353" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="77.353" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="53.811" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="53.811" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="53.811" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="53.811" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="53.811" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="30.268" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="30.268" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="30.268" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="30.268" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="30.268" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="5.605" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="5.605" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="5.605" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="5.605" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="5.605" fill="#1B4996" rx="4.916"/>
        <rect width="1" height="188.087" x="117.209" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="107.163" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="93.767" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="83.721" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="69.209" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="59.163" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="45.767" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="35.721" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="22.326" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="12.279" y="5.605" fill="#C3BFBF"/>
      </g>
      <g>
        <path fill="#326CE5" d="M14.4078545,0.00246976817 C14.1513358,0.0153322543 13.900002,0.0786397599 13.6685975,0.188678336 L3.58090028,4.98643841 C3.05200226,5.23785883 2.66784613,5.71335613 2.53716744,6.27834061 L0.0484645353,17.055322 C-0.0676392653,17.5569761 0.0268316923,18.0836643 0.310365359,18.515454 C0.344394529,18.5677012 0.380992582,18.6182734 0.420028266,18.6669893 L7.40233003,27.308351 C7.76844248,27.7613051 8.32353872,28.0250468 8.91051753,28.024933 L20.1077454,28.0223646 C20.6945046,28.0227902 21.2495617,27.7595397 21.6159329,27.3070668 L28.5956543,18.6644209 C28.9619627,18.2112398 29.0992068,17.6179997 28.9685082,17.0527536 L26.4759348,6.27577222 C26.3452562,5.71078773 25.9611,5.23529043 25.432202,4.98387001 L15.3432146,0.188678336 C15.0521426,0.0502585354 14.7305167,-0.0137697472 14.4078545,0.00246976817 Z"/>
        <path fill="#FFF" d="M14.5078118,3.67001811 C14.1743556,3.67005181 13.9039811,3.96901657 13.9040207,4.33780056 C13.9040211,4.34346048 13.9051849,4.3488689 13.9053088,4.35449512 C13.9048175,4.40460387 13.9023858,4.46497141 13.9040207,4.50859876 C13.911973,4.72130288 13.9585539,4.88409756 13.9865904,5.08006644 C14.0373824,5.49950203 14.0799425,5.84718862 14.0536783,6.17034971 C14.0281358,6.29221076 13.9379618,6.40365892 13.8575752,6.48112539 L13.8433836,6.7353964 C13.4810338,6.76527894 13.1162602,6.81999889 12.7519151,6.90234201 C11.1841387,7.2566645 9.83431084,8.06050568 8.80663079,9.14583421 C8.73994666,9.10055116 8.62328349,9.01724437 8.58859306,8.99173056 C8.48079128,9.00622124 8.37183888,9.03932969 8.22993085,8.95705724 C7.95972517,8.77601094 7.71362777,8.52610415 7.41584504,8.22506494 C7.27939941,8.08106269 7.1805907,7.94393839 7.01847827,7.80513252 C6.98166374,7.77361031 6.92548083,7.73097579 6.88430248,7.69854416 C6.75756292,7.59796298 6.60807788,7.54550815 6.46371298,7.54058793 C6.2781008,7.53426187 6.09941786,7.60649703 5.98248634,7.75248044 C5.77460841,8.01200659 5.84116332,8.40867635 6.13085381,8.63857638 C6.13379329,8.64090643 6.13692351,8.64271787 6.13988487,8.64499737 C6.17969256,8.6771175 6.22843924,8.71827386 6.2650296,8.74516474 C6.43705824,8.87159342 6.59420204,8.93631284 6.76560851,9.03667746 C7.12672717,9.25866109 7.42609896,9.44272453 7.66355419,9.6646498 C7.75628081,9.76303655 7.7724876,9.93640315 7.78482847,10.011383 L7.97835124,10.1834654 C6.94237294,11.7353376 6.46291371,13.6522135 6.7462583,15.6053452 L6.49338854,15.6785445 C6.42674239,15.7642101 6.33256709,15.8990047 6.23406595,15.9392364 C5.92339202,16.0366386 5.57374601,16.0724062 5.15162856,16.1164556 C4.95344844,16.1328584 4.78245192,16.1230698 4.57235038,16.1626867 C4.52610804,16.1714061 4.46167724,16.1881147 4.4110814,16.1999284 C4.40932267,16.2002983 4.40767953,16.2008161 4.4059208,16.2012106 C4.40316297,16.2018475 4.39953981,16.203179 4.39688973,16.203779 C4.04100847,16.2893698 3.81238943,16.6149686 3.8859896,16.9357713 C3.95960711,17.2566492 4.3072248,17.451783 4.66524132,17.3749667 C4.66782575,17.374379 4.67157854,17.3742804 4.67427238,17.3736845 C4.67831417,17.372764 4.68187251,17.370812 4.68588374,17.369834 C4.73579095,17.3589292 4.7983342,17.3467965 4.84199212,17.3351607 C5.0485543,17.2801095 5.19815412,17.1992223 5.38385589,17.1284049 C5.78336699,16.9857761 6.11425647,16.8666252 6.43661979,16.8201977 C6.57125715,16.8097014 6.71310903,16.902886 6.78367064,16.9421964 L7.04686161,16.8972495 C7.65251793,18.7663343 8.9217788,20.2770514 10.5289814,21.2249934 L10.4193185,21.4869696 C10.4588455,21.5886953 10.5024419,21.7263316 10.4729979,21.8267916 C10.3558034,22.129295 10.1550645,22.4485883 9.92648052,22.8045558 C9.81580201,22.9690119 9.70252957,23.0966381 9.60265241,23.2848455 C9.57875261,23.3298803 9.5483141,23.3990597 9.5252433,23.4466543 C9.37006012,23.7771495 9.48389073,24.1577995 9.78198352,24.3006453 C10.081949,24.4443883 10.4542856,24.2927823 10.6154216,23.9616173 C10.6156693,23.9611488 10.6164826,23.9608036 10.6167097,23.9603352 C10.6168748,23.9599653 10.6165446,23.9594105 10.6167097,23.959053 C10.6396612,23.9121007 10.6721771,23.8503845 10.6915385,23.8062336 C10.7770861,23.6111581 10.8055512,23.4439848 10.865709,23.255313 C11.0254657,22.8558706 11.1132394,22.4367544 11.3331601,22.1755968 C11.3933815,22.1040832 11.4915623,22.07658 11.5933546,22.049452 L11.7301107,21.8028862 C13.1312462,22.3382135 14.6995927,22.4818652 16.2662846,22.1277881 C16.6236864,22.0470143 16.9687234,21.9424753 17.3022765,21.8170124 C17.3407119,21.8848726 17.4121409,22.0153212 17.4312917,22.0481678 C17.5347346,22.0816671 17.6476425,22.0989662 17.739638,22.2343764 C17.9041743,22.5141867 18.0166966,22.8452087 18.1537767,23.2450395 C18.2139445,23.4337079 18.2436795,23.6008886 18.3292374,23.79596 C18.3487379,23.840422 18.3810912,23.9030049 18.4040662,23.9500636 C18.5648633,24.2823045 18.9383798,24.4344286 19.2387944,24.2903758 C19.5368505,24.147454 19.6508066,23.7668385 19.4955347,23.4363848 C19.472461,23.3887919 19.4407373,23.3196096 19.4168354,23.274576 C19.3169483,23.0863739 19.2036941,22.9600205 19.0930073,22.7955705 C18.8644044,22.4396149 18.6748049,22.1439094 18.5575943,21.8414121 C18.5085846,21.6853947 18.5658628,21.5883641 18.6040397,21.4869737 C18.581177,21.4608883 18.5322532,21.3135521 18.5034079,21.2442605 C20.1736859,20.2625932 21.405674,18.6955387 21.9842376,16.8856958 C22.062365,16.8979181 22.1981567,16.9218325 22.2422679,16.9306427 C22.3330756,16.8710272 22.4165701,16.7932431 22.5802877,16.8060756 C22.9026531,16.8524863 23.2335331,16.9716746 23.6330516,17.1142829 C23.8187571,17.1850908 23.9683507,17.2672823 24.1749154,17.3223228 C24.2185737,17.3339562 24.2811157,17.3448096 24.3310238,17.3557119 C24.3350367,17.35669 24.3385913,17.3586461 24.3426351,17.3595625 C24.345331,17.3601624 24.3490818,17.360257 24.3516662,17.3608446 C24.7097034,17.4375656 25.057383,17.242546 25.1309179,16.9216492 C25.2044355,16.6008276 24.9759222,16.2751532 24.6200178,16.1896569 C24.5682495,16.1779397 24.4948318,16.1580398 24.4445571,16.1485626 C24.2344535,16.1089567 24.0634599,16.118724 23.8652789,16.1023315 C23.4431594,16.0583039 23.0935204,16.022498 22.7828416,15.9251123 C22.6561689,15.8761986 22.5660535,15.7261649 22.5222288,15.6644203 L22.2783901,15.5937895 C22.4048151,14.683369 22.3707258,13.7358609 22.1519552,12.787819 C21.9311477,11.83095 21.5409241,10.9558004 21.0204921,10.1847517 C21.0830407,10.1281529 21.2011625,10.0240355 21.2346573,9.9934063 C21.2444484,9.88556785 21.2360362,9.77250263 21.3481906,9.65309408 C21.5856339,9.43115648 21.8850296,9.24712427 22.2461363,9.02512174 C22.4175374,8.92474808 22.5759834,8.86004674 22.7480054,8.73360902 C22.786906,8.70501724 22.8400252,8.65973831 22.880891,8.62702066 C23.17052,8.39704337 23.2372033,8.00039745 23.0292585,7.74092472 C22.8213137,7.48145199 22.4183615,7.45701116 22.1287325,7.68698845 C22.0875071,7.71948788 22.0315674,7.76188364 21.9945567,7.7935768 C21.8324517,7.93239172 21.732338,8.06949999 21.5958998,8.21350922 C21.2981332,8.51456405 21.0520102,8.76572504 20.781814,8.94678572 C20.6647297,9.01463489 20.4932345,8.99115853 20.4154088,8.98659583 L20.1857618,9.14968885 C18.8762556,7.78286886 17.0933334,6.90900299 15.1735301,6.73924899 C15.1681606,6.6591677 15.1611261,6.51441506 15.1593385,6.47085181 C15.0807441,6.39599237 14.9858009,6.3320821 14.9619452,6.17034971 C14.935681,5.84718862 14.9795313,5.49950203 15.0303233,5.08006644 C15.0583598,4.88409756 15.1049407,4.72130288 15.112893,4.50859876 C15.1147013,4.46024597 15.1117989,4.39008238 15.1116049,4.33780056 C15.1115653,3.96901657 14.84127,3.66998441 14.5078138,3.67001811 L14.5078118,3.67001811 Z M13.7517828,8.3316533 L13.5724517,11.484357 L13.5595502,11.490778 C13.5475222,11.7728226 13.3143198,11.9980358 13.0280076,11.9980358 C12.9107252,11.9980358 12.8024709,11.9605459 12.7145007,11.8965842 L12.7093401,11.8991526 L10.1122645,10.0666035 C10.9104515,9.28535348 11.9313955,8.70800973 13.107997,8.44209424 C13.3229256,8.39351954 13.5377584,8.35747696 13.7517828,8.3316533 Z M15.2651309,8.3316533 C16.6388214,8.49982434 17.9092201,9.11897168 18.8827167,10.0678877 L16.302413,11.888879 L16.2933819,11.8850285 C16.0643562,12.0515299 15.7416746,12.0102178 15.563156,11.7874295 C15.4900273,11.6961607 15.4516571,11.5888458 15.4470423,11.4805064 L15.444462,11.4792243 L15.2651309,8.3316533 Z M9.17045361,11.2442121 L11.5417527,13.355432 L11.5391724,13.368274 C11.7532084,13.5534848 11.7847711,13.8748821 11.6062603,14.0976979 C11.5331365,14.1889704 11.4352551,14.2501882 11.3301678,14.2787697 L11.3275875,14.2890433 L8.28798975,15.1622973 C8.13328382,13.7541939 8.46669332,12.3854055 9.17045361,11.2442121 Z M19.828398,11.2454943 C20.1807271,11.8139337 20.4475284,12.4488235 20.6063595,13.1371165 C20.7632858,13.8171566 20.8026686,14.4959806 20.737955,15.1520216 L17.6828755,14.2761993 L17.6802952,14.2633573 C17.406721,14.1889339 17.2385913,13.9119344 17.3022807,13.6341007 C17.3283739,13.5202851 17.3890705,13.4240004 17.4712906,13.3528616 L17.4700025,13.3464406 L19.8284,11.2454943 L19.828398,11.2454943 Z M14.0214245,13.518523 L14.9929089,13.518523 L15.5966999,14.2697783 L15.3799544,15.2072421 L14.5078118,15.6246061 L13.6330888,15.2059579 L13.4163433,14.2684941 L14.0214245,13.518523 Z M17.1358511,16.0894854 C17.1771347,16.0874102 17.2182383,16.0911128 17.2584155,16.0984748 L17.2635761,16.0920538 L20.4076761,16.621143 C19.9475357,17.9079331 19.0670408,19.0227016 17.8905899,19.7687099 L16.6701063,16.8343197 L16.6739747,16.8291829 C16.5618611,16.5698783 16.6740572,16.2657981 16.932005,16.1421375 C16.9980463,16.1104781 17.0670433,16.0929472 17.135849,16.0894854 L17.1358511,16.0894854 Z M11.8552596,16.1023274 C12.0951965,16.1056766 12.3104095,16.2714408 12.3661597,16.5145547 C12.3922596,16.6283686 12.3795567,16.7411384 12.3364862,16.8407407 L12.3455173,16.8522985 L11.1379352,19.7571521 C10.0089115,19.0360046 9.10964019,17.9562341 8.62858983,16.6314186 L11.7455967,16.1048979 L11.7507573,16.1113188 C11.7856228,16.1049324 11.8209828,16.1018507 11.8552596,16.1023295 L11.8552596,16.1023274 Z M14.4884595,17.3749687 C14.5720386,17.3719113 14.656846,17.3889811 14.7374588,17.4276208 C14.8431278,17.4782708 14.9247571,17.5580208 14.9761369,17.6536395 L14.9877483,17.6536395 L16.5243191,20.4172315 C16.3249013,20.4837726 16.1198889,20.5406409 15.9102068,20.5880297 C14.7350527,20.853618 13.5636324,20.7731459 12.5029158,20.4133789 L14.0356162,17.6549237 L14.0381965,17.6549237 C14.1301655,17.4837901 14.3045858,17.381693 14.4884595,17.3749687 Z"/>
      </g>
    </g>
    <g id="daemonset-animejs-solar1" fill-rule="nonzero" transform="translate(245 334)">
      <g transform="translate(14.512 13.453)">
        <rect width="127.808" height="197.867" x=".84" y=".84" fill="url(#linearGradient-1)" stroke="url(#linearGradient-2)" stroke-width="1.68"/>
        <rect width="22.37" height="22.401" x="100.465" y="171.521" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="171.521" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="171.521" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="171.521" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="171.521" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="147.979" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="147.979" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="147.979" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="147.979" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="147.979" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="124.437" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="124.437" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="124.437" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="124.437" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="124.437" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="100.895" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="100.895" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="100.895" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="100.895" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="100.895" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="77.353" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="77.353" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="77.353" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="77.353" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="77.353" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="53.811" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="53.811" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="53.811" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="53.811" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="53.811" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="30.268" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="30.268" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="30.268" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="30.268" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="30.268" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="5.605" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="5.605" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="5.605" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="5.605" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="5.605" fill="#1B4996" rx="4.916"/>
        <rect width="1" height="188.087" x="117.209" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="107.163" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="93.767" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="83.721" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="69.209" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="59.163" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="45.767" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="35.721" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="22.326" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="12.279" y="5.605" fill="#C3BFBF"/>
      </g>
      <g>
        <path fill="#326CE5" d="M14.4078545,0.00246976817 C14.1513358,0.0153322543 13.900002,0.0786397599 13.6685975,0.188678336 L3.58090028,4.98643841 C3.05200226,5.23785883 2.66784613,5.71335613 2.53716744,6.27834061 L0.0484645353,17.055322 C-0.0676392653,17.5569761 0.0268316923,18.0836643 0.310365359,18.515454 C0.344394529,18.5677012 0.380992582,18.6182734 0.420028266,18.6669893 L7.40233003,27.308351 C7.76844248,27.7613051 8.32353872,28.0250468 8.91051753,28.024933 L20.1077454,28.0223646 C20.6945046,28.0227902 21.2495617,27.7595397 21.6159329,27.3070668 L28.5956543,18.6644209 C28.9619627,18.2112398 29.0992068,17.6179997 28.9685082,17.0527536 L26.4759348,6.27577222 C26.3452562,5.71078773 25.9611,5.23529043 25.432202,4.98387001 L15.3432146,0.188678336 C15.0521426,0.0502585354 14.7305167,-0.0137697472 14.4078545,0.00246976817 Z"/>
        <path fill="#FFF" d="M14.5078118,3.67001811 C14.1743556,3.67005181 13.9039811,3.96901657 13.9040207,4.33780056 C13.9040211,4.34346048 13.9051849,4.3488689 13.9053088,4.35449512 C13.9048175,4.40460387 13.9023858,4.46497141 13.9040207,4.50859876 C13.911973,4.72130288 13.9585539,4.88409756 13.9865904,5.08006644 C14.0373824,5.49950203 14.0799425,5.84718862 14.0536783,6.17034971 C14.0281358,6.29221076 13.9379618,6.40365892 13.8575752,6.48112539 L13.8433836,6.7353964 C13.4810338,6.76527894 13.1162602,6.81999889 12.7519151,6.90234201 C11.1841387,7.2566645 9.83431084,8.06050568 8.80663079,9.14583421 C8.73994666,9.10055116 8.62328349,9.01724437 8.58859306,8.99173056 C8.48079128,9.00622124 8.37183888,9.03932969 8.22993085,8.95705724 C7.95972517,8.77601094 7.71362777,8.52610415 7.41584504,8.22506494 C7.27939941,8.08106269 7.1805907,7.94393839 7.01847827,7.80513252 C6.98166374,7.77361031 6.92548083,7.73097579 6.88430248,7.69854416 C6.75756292,7.59796298 6.60807788,7.54550815 6.46371298,7.54058793 C6.2781008,7.53426187 6.09941786,7.60649703 5.98248634,7.75248044 C5.77460841,8.01200659 5.84116332,8.40867635 6.13085381,8.63857638 C6.13379329,8.64090643 6.13692351,8.64271787 6.13988487,8.64499737 C6.17969256,8.6771175 6.22843924,8.71827386 6.2650296,8.74516474 C6.43705824,8.87159342 6.59420204,8.93631284 6.76560851,9.03667746 C7.12672717,9.25866109 7.42609896,9.44272453 7.66355419,9.6646498 C7.75628081,9.76303655 7.7724876,9.93640315 7.78482847,10.011383 L7.97835124,10.1834654 C6.94237294,11.7353376 6.46291371,13.6522135 6.7462583,15.6053452 L6.49338854,15.6785445 C6.42674239,15.7642101 6.33256709,15.8990047 6.23406595,15.9392364 C5.92339202,16.0366386 5.57374601,16.0724062 5.15162856,16.1164556 C4.95344844,16.1328584 4.78245192,16.1230698 4.57235038,16.1626867 C4.52610804,16.1714061 4.46167724,16.1881147 4.4110814,16.1999284 C4.40932267,16.2002983 4.40767953,16.2008161 4.4059208,16.2012106 C4.40316297,16.2018475 4.39953981,16.203179 4.39688973,16.203779 C4.04100847,16.2893698 3.81238943,16.6149686 3.8859896,16.9357713 C3.95960711,17.2566492 4.3072248,17.451783 4.66524132,17.3749667 C4.66782575,17.374379 4.67157854,17.3742804 4.67427238,17.3736845 C4.67831417,17.372764 4.68187251,17.370812 4.68588374,17.369834 C4.73579095,17.3589292 4.7983342,17.3467965 4.84199212,17.3351607 C5.0485543,17.2801095 5.19815412,17.1992223 5.38385589,17.1284049 C5.78336699,16.9857761 6.11425647,16.8666252 6.43661979,16.8201977 C6.57125715,16.8097014 6.71310903,16.902886 6.78367064,16.9421964 L7.04686161,16.8972495 C7.65251793,18.7663343 8.9217788,20.2770514 10.5289814,21.2249934 L10.4193185,21.4869696 C10.4588455,21.5886953 10.5024419,21.7263316 10.4729979,21.8267916 C10.3558034,22.129295 10.1550645,22.4485883 9.92648052,22.8045558 C9.81580201,22.9690119 9.70252957,23.0966381 9.60265241,23.2848455 C9.57875261,23.3298803 9.5483141,23.3990597 9.5252433,23.4466543 C9.37006012,23.7771495 9.48389073,24.1577995 9.78198352,24.3006453 C10.081949,24.4443883 10.4542856,24.2927823 10.6154216,23.9616173 C10.6156693,23.9611488 10.6164826,23.9608036 10.6167097,23.9603352 C10.6168748,23.9599653 10.6165446,23.9594105 10.6167097,23.959053 C10.6396612,23.9121007 10.6721771,23.8503845 10.6915385,23.8062336 C10.7770861,23.6111581 10.8055512,23.4439848 10.865709,23.255313 C11.0254657,22.8558706 11.1132394,22.4367544 11.3331601,22.1755968 C11.3933815,22.1040832 11.4915623,22.07658 11.5933546,22.049452 L11.7301107,21.8028862 C13.1312462,22.3382135 14.6995927,22.4818652 16.2662846,22.1277881 C16.6236864,22.0470143 16.9687234,21.9424753 17.3022765,21.8170124 C17.3407119,21.8848726 17.4121409,22.0153212 17.4312917,22.0481678 C17.5347346,22.0816671 17.6476425,22.0989662 17.739638,22.2343764 C17.9041743,22.5141867 18.0166966,22.8452087 18.1537767,23.2450395 C18.2139445,23.4337079 18.2436795,23.6008886 18.3292374,23.79596 C18.3487379,23.840422 18.3810912,23.9030049 18.4040662,23.9500636 C18.5648633,24.2823045 18.9383798,24.4344286 19.2387944,24.2903758 C19.5368505,24.147454 19.6508066,23.7668385 19.4955347,23.4363848 C19.472461,23.3887919 19.4407373,23.3196096 19.4168354,23.274576 C19.3169483,23.0863739 19.2036941,22.9600205 19.0930073,22.7955705 C18.8644044,22.4396149 18.6748049,22.1439094 18.5575943,21.8414121 C18.5085846,21.6853947 18.5658628,21.5883641 18.6040397,21.4869737 C18.581177,21.4608883 18.5322532,21.3135521 18.5034079,21.2442605 C20.1736859,20.2625932 21.405674,18.6955387 21.9842376,16.8856958 C22.062365,16.8979181 22.1981567,16.9218325 22.2422679,16.9306427 C22.3330756,16.8710272 22.4165701,16.7932431 22.5802877,16.8060756 C22.9026531,16.8524863 23.2335331,16.9716746 23.6330516,17.1142829 C23.8187571,17.1850908 23.9683507,17.2672823 24.1749154,17.3223228 C24.2185737,17.3339562 24.2811157,17.3448096 24.3310238,17.3557119 C24.3350367,17.35669 24.3385913,17.3586461 24.3426351,17.3595625 C24.345331,17.3601624 24.3490818,17.360257 24.3516662,17.3608446 C24.7097034,17.4375656 25.057383,17.242546 25.1309179,16.9216492 C25.2044355,16.6008276 24.9759222,16.2751532 24.6200178,16.1896569 C24.5682495,16.1779397 24.4948318,16.1580398 24.4445571,16.1485626 C24.2344535,16.1089567 24.0634599,16.118724 23.8652789,16.1023315 C23.4431594,16.0583039 23.0935204,16.022498 22.7828416,15.9251123 C22.6561689,15.8761986 22.5660535,15.7261649 22.5222288,15.6644203 L22.2783901,15.5937895 C22.4048151,14.683369 22.3707258,13.7358609 22.1519552,12.787819 C21.9311477,11.83095 21.5409241,10.9558004 21.0204921,10.1847517 C21.0830407,10.1281529 21.2011625,10.0240355 21.2346573,9.9934063 C21.2444484,9.88556785 21.2360362,9.77250263 21.3481906,9.65309408 C21.5856339,9.43115648 21.8850296,9.24712427 22.2461363,9.02512174 C22.4175374,8.92474808 22.5759834,8.86004674 22.7480054,8.73360902 C22.786906,8.70501724 22.8400252,8.65973831 22.880891,8.62702066 C23.17052,8.39704337 23.2372033,8.00039745 23.0292585,7.74092472 C22.8213137,7.48145199 22.4183615,7.45701116 22.1287325,7.68698845 C22.0875071,7.71948788 22.0315674,7.76188364 21.9945567,7.7935768 C21.8324517,7.93239172 21.732338,8.06949999 21.5958998,8.21350922 C21.2981332,8.51456405 21.0520102,8.76572504 20.781814,8.94678572 C20.6647297,9.01463489 20.4932345,8.99115853 20.4154088,8.98659583 L20.1857618,9.14968885 C18.8762556,7.78286886 17.0933334,6.90900299 15.1735301,6.73924899 C15.1681606,6.6591677 15.1611261,6.51441506 15.1593385,6.47085181 C15.0807441,6.39599237 14.9858009,6.3320821 14.9619452,6.17034971 C14.935681,5.84718862 14.9795313,5.49950203 15.0303233,5.08006644 C15.0583598,4.88409756 15.1049407,4.72130288 15.112893,4.50859876 C15.1147013,4.46024597 15.1117989,4.39008238 15.1116049,4.33780056 C15.1115653,3.96901657 14.84127,3.66998441 14.5078138,3.67001811 L14.5078118,3.67001811 Z M13.7517828,8.3316533 L13.5724517,11.484357 L13.5595502,11.490778 C13.5475222,11.7728226 13.3143198,11.9980358 13.0280076,11.9980358 C12.9107252,11.9980358 12.8024709,11.9605459 12.7145007,11.8965842 L12.7093401,11.8991526 L10.1122645,10.0666035 C10.9104515,9.28535348 11.9313955,8.70800973 13.107997,8.44209424 C13.3229256,8.39351954 13.5377584,8.35747696 13.7517828,8.3316533 Z M15.2651309,8.3316533 C16.6388214,8.49982434 17.9092201,9.11897168 18.8827167,10.0678877 L16.302413,11.888879 L16.2933819,11.8850285 C16.0643562,12.0515299 15.7416746,12.0102178 15.563156,11.7874295 C15.4900273,11.6961607 15.4516571,11.5888458 15.4470423,11.4805064 L15.444462,11.4792243 L15.2651309,8.3316533 Z M9.17045361,11.2442121 L11.5417527,13.355432 L11.5391724,13.368274 C11.7532084,13.5534848 11.7847711,13.8748821 11.6062603,14.0976979 C11.5331365,14.1889704 11.4352551,14.2501882 11.3301678,14.2787697 L11.3275875,14.2890433 L8.28798975,15.1622973 C8.13328382,13.7541939 8.46669332,12.3854055 9.17045361,11.2442121 Z M19.828398,11.2454943 C20.1807271,11.8139337 20.4475284,12.4488235 20.6063595,13.1371165 C20.7632858,13.8171566 20.8026686,14.4959806 20.737955,15.1520216 L17.6828755,14.2761993 L17.6802952,14.2633573 C17.406721,14.1889339 17.2385913,13.9119344 17.3022807,13.6341007 C17.3283739,13.5202851 17.3890705,13.4240004 17.4712906,13.3528616 L17.4700025,13.3464406 L19.8284,11.2454943 L19.828398,11.2454943 Z M14.0214245,13.518523 L14.9929089,13.518523 L15.5966999,14.2697783 L15.3799544,15.2072421 L14.5078118,15.6246061 L13.6330888,15.2059579 L13.4163433,14.2684941 L14.0214245,13.518523 Z M17.1358511,16.0894854 C17.1771347,16.0874102 17.2182383,16.0911128 17.2584155,16.0984748 L17.2635761,16.0920538 L20.4076761,16.621143 C19.9475357,17.9079331 19.0670408,19.0227016 17.8905899,19.7687099 L16.6701063,16.8343197 L16.6739747,16.8291829 C16.5618611,16.5698783 16.6740572,16.2657981 16.932005,16.1421375 C16.9980463,16.1104781 17.0670433,16.0929472 17.135849,16.0894854 L17.1358511,16.0894854 Z M11.8552596,16.1023274 C12.0951965,16.1056766 12.3104095,16.2714408 12.3661597,16.5145547 C12.3922596,16.6283686 12.3795567,16.7411384 12.3364862,16.8407407 L12.3455173,16.8522985 L11.1379352,19.7571521 C10.0089115,19.0360046 9.10964019,17.9562341 8.62858983,16.6314186 L11.7455967,16.1048979 L11.7507573,16.1113188 C11.7856228,16.1049324 11.8209828,16.1018507 11.8552596,16.1023295 L11.8552596,16.1023274 Z M14.4884595,17.3749687 C14.5720386,17.3719113 14.656846,17.3889811 14.7374588,17.4276208 C14.8431278,17.4782708 14.9247571,17.5580208 14.9761369,17.6536395 L14.9877483,17.6536395 L16.5243191,20.4172315 C16.3249013,20.4837726 16.1198889,20.5406409 15.9102068,20.5880297 C14.7350527,20.853618 13.5636324,20.7731459 12.5029158,20.4133789 L14.0356162,17.6549237 L14.0381965,17.6549237 C14.1301655,17.4837901 14.3045858,17.381693 14.4884595,17.3749687 Z"/>
      </g>
    </g>
    <g id="daemonset-animejs-solar3" fill-rule="nonzero" transform="translate(78 334)">
      <g transform="translate(14.512 13.453)">
        <rect width="127.808" height="197.867" x=".84" y=".84" fill="url(#linearGradient-1)" stroke="url(#linearGradient-2)" stroke-width="1.68"/>
        <rect width="22.37" height="22.401" x="100.465" y="171.521" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="171.521" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="171.521" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="171.521" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="171.521" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="147.979" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="147.979" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="147.979" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="147.979" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="147.979" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="124.437" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="124.437" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="124.437" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="124.437" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="124.437" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="100.895" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="100.895" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="100.895" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="100.895" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="100.895" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="77.353" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="77.353" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="77.353" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="77.353" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="77.353" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="53.811" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="53.811" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="53.811" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="53.811" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="53.811" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="30.268" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="30.268" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="30.268" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="30.268" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="30.268" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="100.465" y="5.605" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="77.023" y="5.605" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="53.581" y="5.605" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="30.14" y="5.605" fill="#1B4996" rx="4.916"/>
        <rect width="22.37" height="22.401" x="6.698" y="5.605" fill="#1B4996" rx="4.916"/>
        <rect width="1" height="188.087" x="117.209" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="107.163" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="93.767" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="83.721" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="69.209" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="59.163" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="45.767" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="35.721" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="22.326" y="5.605" fill="#C3BFBF"/>
        <rect width="1" height="188.087" x="12.279" y="5.605" fill="#C3BFBF"/>
      </g>
      <g>
        <path fill="#326CE5" d="M14.4078545,0.00246976817 C14.1513358,0.0153322543 13.900002,0.0786397599 13.6685975,0.188678336 L3.58090028,4.98643841 C3.05200226,5.23785883 2.66784613,5.71335613 2.53716744,6.27834061 L0.0484645353,17.055322 C-0.0676392653,17.5569761 0.0268316923,18.0836643 0.310365359,18.515454 C0.344394529,18.5677012 0.380992582,18.6182734 0.420028266,18.6669893 L7.40233003,27.308351 C7.76844248,27.7613051 8.32353872,28.0250468 8.91051753,28.024933 L20.1077454,28.0223646 C20.6945046,28.0227902 21.2495617,27.7595397 21.6159329,27.3070668 L28.5956543,18.6644209 C28.9619627,18.2112398 29.0992068,17.6179997 28.9685082,17.0527536 L26.4759348,6.27577222 C26.3452562,5.71078773 25.9611,5.23529043 25.432202,4.98387001 L15.3432146,0.188678336 C15.0521426,0.0502585354 14.7305167,-0.0137697472 14.4078545,0.00246976817 Z"/>
        <path fill="#FFF" d="M14.5078118,3.67001811 C14.1743556,3.67005181 13.9039811,3.96901657 13.9040207,4.33780056 C13.9040211,4.34346048 13.9051849,4.3488689 13.9053088,4.35449512 C13.9048175,4.40460387 13.9023858,4.46497141 13.9040207,4.50859876 C13.911973,4.72130288 13.9585539,4.88409756 13.9865904,5.08006644 C14.0373824,5.49950203 14.0799425,5.84718862 14.0536783,6.17034971 C14.0281358,6.29221076 13.9379618,6.40365892 13.8575752,6.48112539 L13.8433836,6.7353964 C13.4810338,6.76527894 13.1162602,6.81999889 12.7519151,6.90234201 C11.1841387,7.2566645 9.83431084,8.06050568 8.80663079,9.14583421 C8.73994666,9.10055116 8.62328349,9.01724437 8.58859306,8.99173056 C8.48079128,9.00622124 8.37183888,9.03932969 8.22993085,8.95705724 C7.95972517,8.77601094 7.71362777,8.52610415 7.41584504,8.22506494 C7.27939941,8.08106269 7.1805907,7.94393839 7.01847827,7.80513252 C6.98166374,7.77361031 6.92548083,7.73097579 6.88430248,7.69854416 C6.75756292,7.59796298 6.60807788,7.54550815 6.46371298,7.54058793 C6.2781008,7.53426187 6.09941786,7.60649703 5.98248634,7.75248044 C5.77460841,8.01200659 5.84116332,8.40867635 6.13085381,8.63857638 C6.13379329,8.64090643 6.13692351,8.64271787 6.13988487,8.64499737 C6.17969256,8.6771175 6.22843924,8.71827386 6.2650296,8.74516474 C6.43705824,8.87159342 6.59420204,8.93631284 6.76560851,9.03667746 C7.12672717,9.25866109 7.42609896,9.44272453 7.66355419,9.6646498 C7.75628081,9.76303655 7.7724876,9.93640315 7.78482847,10.011383 L7.97835124,10.1834654 C6.94237294,11.7353376 6.46291371,13.6522135 6.7462583,15.6053452 L6.49338854,15.6785445 C6.42674239,15.7642101 6.33256709,15.8990047 6.23406595,15.9392364 C5.92339202,16.0366386 5.57374601,16.0724062 5.15162856,16.1164556 C4.95344844,16.1328584 4.78245192,16.1230698 4.57235038,16.1626867 C4.52610804,16.1714061 4.46167724,16.1881147 4.4110814,16.1999284 C4.40932267,16.2002983 4.40767953,16.2008161 4.4059208,16.2012106 C4.40316297,16.2018475 4.39953981,16.203179 4.39688973,16.203779 C4.04100847,16.2893698 3.81238943,16.6149686 3.8859896,16.9357713 C3.95960711,17.2566492 4.3072248,17.451783 4.66524132,17.3749667 C4.66782575,17.374379 4.67157854,17.3742804 4.67427238,17.3736845 C4.67831417,17.372764 4.68187251,17.370812 4.68588374,17.369834 C4.73579095,17.3589292 4.7983342,17.3467965 4.84199212,17.3351607 C5.0485543,17.2801095 5.19815412,17.1992223 5.38385589,17.1284049 C5.78336699,16.9857761 6.11425647,16.8666252 6.43661979,16.8201977 C6.57125715,16.8097014 6.71310903,16.902886 6.78367064,16.9421964 L7.04686161,16.8972495 C7.65251793,18.7663343 8.9217788,20.2770514 10.5289814,21.2249934 L10.4193185,21.4869696 C10.4588455,21.5886953 10.5024419,21.7263316 10.4729979,21.8267916 C10.3558034,22.129295 10.1550645,22.4485883 9.92648052,22.8045558 C9.81580201,22.9690119 9.70252957,23.0966381 9.60265241,23.2848455 C9.57875261,23.3298803 9.5483141,23.3990597 9.5252433,23.4466543 C9.37006012,23.7771495 9.48389073,24.1577995 9.78198352,24.3006453 C10.081949,24.4443883 10.4542856,24.2927823 10.6154216,23.9616173 C10.6156693,23.9611488 10.6164826,23.9608036 10.6167097,23.9603352 C10.6168748,23.9599653 10.6165446,23.9594105 10.6167097,23.959053 C10.6396612,23.9121007 10.6721771,23.8503845 10.6915385,23.8062336 C10.7770861,23.6111581 10.8055512,23.4439848 10.865709,23.255313 C11.0254657,22.8558706 11.1132394,22.4367544 11.3331601,22.1755968 C11.3933815,22.1040832 11.4915623,22.07658 11.5933546,22.049452 L11.7301107,21.8028862 C13.1312462,22.3382135 14.6995927,22.4818652 16.2662846,22.1277881 C16.6236864,22.0470143 16.9687234,21.9424753 17.3022765,21.8170124 C17.3407119,21.8848726 17.4121409,22.0153212 17.4312917,22.0481678 C17.5347346,22.0816671 17.6476425,22.0989662 17.739638,22.2343764 C17.9041743,22.5141867 18.0166966,22.8452087 18.1537767,23.2450395 C18.2139445,23.4337079 18.2436795,23.6008886 18.3292374,23.79596 C18.3487379,23.840422 18.3810912,23.9030049 18.4040662,23.9500636 C18.5648633,24.2823045 18.9383798,24.4344286 19.2387944,24.2903758 C19.5368505,24.147454 19.6508066,23.7668385 19.4955347,23.4363848 C19.472461,23.3887919 19.4407373,23.3196096 19.4168354,23.274576 C19.3169483,23.0863739 19.2036941,22.9600205 19.0930073,22.7955705 C18.8644044,22.4396149 18.6748049,22.1439094 18.5575943,21.8414121 C18.5085846,21.6853947 18.5658628,21.5883641 18.6040397,21.4869737 C18.581177,21.4608883 18.5322532,21.3135521 18.5034079,21.2442605 C20.1736859,20.2625932 21.405674,18.6955387 21.9842376,16.8856958 C22.062365,16.8979181 22.1981567,16.9218325 22.2422679,16.9306427 C22.3330756,16.8710272 22.4165701,16.7932431 22.5802877,16.8060756 C22.9026531,16.8524863 23.2335331,16.9716746 23.6330516,17.1142829 C23.8187571,17.1850908 23.9683507,17.2672823 24.1749154,17.3223228 C24.2185737,17.3339562 24.2811157,17.3448096 24.3310238,17.3557119 C24.3350367,17.35669 24.3385913,17.3586461 24.3426351,17.3595625 C24.345331,17.3601624 24.3490818,17.360257 24.3516662,17.3608446 C24.7097034,17.4375656 25.057383,17.242546 25.1309179,16.9216492 C25.2044355,16.6008276 24.9759222,16.2751532 24.6200178,16.1896569 C24.5682495,16.1779397 24.4948318,16.1580398 24.4445571,16.1485626 C24.2344535,16.1089567 24.0634599,16.118724 23.8652789,16.1023315 C23.4431594,16.0583039 23.0935204,16.022498 22.7828416,15.9251123 C22.6561689,15.8761986 22.5660535,15.7261649 22.5222288,15.6644203 L22.2783901,15.5937895 C22.4048151,14.683369 22.3707258,13.7358609 22.1519552,12.787819 C21.9311477,11.83095 21.5409241,10.9558004 21.0204921,10.1847517 C21.0830407,10.1281529 21.2011625,10.0240355 21.2346573,9.9934063 C21.2444484,9.88556785 21.2360362,9.77250263 21.3481906,9.65309408 C21.5856339,9.43115648 21.8850296,9.24712427 22.2461363,9.02512174 C22.4175374,8.92474808 22.5759834,8.86004674 22.7480054,8.73360902 C22.786906,8.70501724 22.8400252,8.65973831 22.880891,8.62702066 C23.17052,8.39704337 23.2372033,8.00039745 23.0292585,7.74092472 C22.8213137,7.48145199 22.4183615,7.45701116 22.1287325,7.68698845 C22.0875071,7.71948788 22.0315674,7.76188364 21.9945567,7.7935768 C21.8324517,7.93239172 21.732338,8.06949999 21.5958998,8.21350922 C21.2981332,8.51456405 21.0520102,8.76572504 20.781814,8.94678572 C20.6647297,9.01463489 20.4932345,8.99115853 20.4154088,8.98659583 L20.1857618,9.14968885 C18.8762556,7.78286886 17.0933334,6.90900299 15.1735301,6.73924899 C15.1681606,6.6591677 15.1611261,6.51441506 15.1593385,6.47085181 C15.0807441,6.39599237 14.9858009,6.3320821 14.9619452,6.17034971 C14.935681,5.84718862 14.9795313,5.49950203 15.0303233,5.08006644 C15.0583598,4.88409756 15.1049407,4.72130288 15.112893,4.50859876 C15.1147013,4.46024597 15.1117989,4.39008238 15.1116049,4.33780056 C15.1115653,3.96901657 14.84127,3.66998441 14.5078138,3.67001811 L14.5078118,3.67001811 Z M13.7517828,8.3316533 L13.5724517,11.484357 L13.5595502,11.490778 C13.5475222,11.7728226 13.3143198,11.9980358 13.0280076,11.9980358 C12.9107252,11.9980358 12.8024709,11.9605459 12.7145007,11.8965842 L12.7093401,11.8991526 L10.1122645,10.0666035 C10.9104515,9.28535348 11.9313955,8.70800973 13.107997,8.44209424 C13.3229256,8.39351954 13.5377584,8.35747696 13.7517828,8.3316533 Z M15.2651309,8.3316533 C16.6388214,8.49982434 17.9092201,9.11897168 18.8827167,10.0678877 L16.302413,11.888879 L16.2933819,11.8850285 C16.0643562,12.0515299 15.7416746,12.0102178 15.563156,11.7874295 C15.4900273,11.6961607 15.4516571,11.5888458 15.4470423,11.4805064 L15.444462,11.4792243 L15.2651309,8.3316533 Z M9.17045361,11.2442121 L11.5417527,13.355432 L11.5391724,13.368274 C11.7532084,13.5534848 11.7847711,13.8748821 11.6062603,14.0976979 C11.5331365,14.1889704 11.4352551,14.2501882 11.3301678,14.2787697 L11.3275875,14.2890433 L8.28798975,15.1622973 C8.13328382,13.7541939 8.46669332,12.3854055 9.17045361,11.2442121 Z M19.828398,11.2454943 C20.1807271,11.8139337 20.4475284,12.4488235 20.6063595,13.1371165 C20.7632858,13.8171566 20.8026686,14.4959806 20.737955,15.1520216 L17.6828755,14.2761993 L17.6802952,14.2633573 C17.406721,14.1889339 17.2385913,13.9119344 17.3022807,13.6341007 C17.3283739,13.5202851 17.3890705,13.4240004 17.4712906,13.3528616 L17.4700025,13.3464406 L19.8284,11.2454943 L19.828398,11.2454943 Z M14.0214245,13.518523 L14.9929089,13.518523 L15.5966999,14.2697783 L15.3799544,15.2072421 L14.5078118,15.6246061 L13.6330888,15.2059579 L13.4163433,14.2684941 L14.0214245,13.518523 Z M17.1358511,16.0894854 C17.1771347,16.0874102 17.2182383,16.0911128 17.2584155,16.0984748 L17.2635761,16.0920538 L20.4076761,16.621143 C19.9475357,17.9079331 19.0670408,19.0227016 17.8905899,19.7687099 L16.6701063,16.8343197 L16.6739747,16.8291829 C16.5618611,16.5698783 16.6740572,16.2657981 16.932005,16.1421375 C16.9980463,16.1104781 17.0670433,16.0929472 17.135849,16.0894854 L17.1358511,16.0894854 Z M11.8552596,16.1023274 C12.0951965,16.1056766 12.3104095,16.2714408 12.3661597,16.5145547 C12.3922596,16.6283686 12.3795567,16.7411384 12.3364862,16.8407407 L12.3455173,16.8522985 L11.1379352,19.7571521 C10.0089115,19.0360046 9.10964019,17.9562341 8.62858983,16.6314186 L11.7455967,16.1048979 L11.7507573,16.1113188 C11.7856228,16.1049324 11.8209828,16.1018507 11.8552596,16.1023295 L11.8552596,16.1023274 Z M14.4884595,17.3749687 C14.5720386,17.3719113 14.656846,17.3889811 14.7374588,17.4276208 C14.8431278,17.4782708 14.9247571,17.5580208 14.9761369,17.6536395 L14.9877483,17.6536395 L16.5243191,20.4172315 C16.3249013,20.4837726 16.1198889,20.5406409 15.9102068,20.5880297 C14.7350527,20.853618 13.5636324,20.7731459 12.5029158,20.4133789 L14.0356162,17.6549237 L14.0381965,17.6549237 C14.1301655,17.4837901 14.3045858,17.381693 14.4884595,17.3749687 Z"/>
      </g>
    </g>
    <g id="daemonset-animejs-app1" transform="translate(269 443)">
      <g transform="translate(.558 .863)">
        <path fill="#00C176" d="M110.880009,93.7313344 C110.880009,94.3229226 110.532834,94.8024074 110.104402,94.8024074 L0.775606353,94.8024074 C0.347174859,94.8024074 0,94.3229226 0,93.7313344 L4.4408921e-16,2.77200022 C2.56603935e-16,1.24106677 1.24106677,-3.27148577e-15 2.77200022,-3.55271368e-15 L108.108008,4.4408921e-16 C109.638942,1.62861298e-16 110.880009,1.24106677 110.880009,2.77200022 L110.880009,93.7313344 Z"/>
        <text fill="#FFF" font-size="18.85" font-weight="bold" class="sans-serif">
          <tspan x="36.061" y="60.243">APP</tspan>
        </text>
        <path fill="#CCC" d="M2.77200022,0 L108.108008,4.4408921e-16 C109.638942,1.62861298e-16 110.880009,1.24106677 110.880009,2.77200022 L110.880009,12.751201 L0,12.751201 L4.4408921e-16,2.77200022 C2.56603935e-16,1.24106677 1.24106677,7.25317122e-16 2.77200022,4.4408921e-16 Z"/>
        <path fill="#E74C3C" d="M9.42480074,6.93000054 C9.42480074,8.30799487 8.30799487,9.42480074 6.93000054,9.42480074 C5.55200621,9.42480074 4.43520035,8.30799487 4.43520035,6.93000054 C4.43520035,5.55200621 5.55200621,4.43520035 6.93000054,4.43520035 C8.30799487,4.43520035 9.42480074,5.55200621 9.42480074,6.93000054"/>
        <path fill="#F1C40F" d="M18.2952014,6.93000054 C18.2952014,8.30799487 17.1783956,9.42480074 15.8004012,9.42480074 C14.4224069,9.42480074 13.305601,8.30799487 13.305601,6.93000054 C13.305601,5.55200621 14.4224069,4.43520035 15.8004012,4.43520035 C17.1783956,4.43520035 18.2952014,5.55200621 18.2952014,6.93000054"/>
        <path fill="#2ECC71" d="M26.6112021,6.93000054 C26.6112021,8.30799487 25.4943962,9.42480074 24.1164019,9.42480074 C22.7384076,9.42480074 21.6216017,8.30799487 21.6216017,6.93000054 C21.6216017,5.55200621 22.7384076,4.43520035 24.1164019,4.43520035 C25.4943962,4.43520035 26.6112021,5.55200621 26.6112021,6.93000054"/>
      </g>
    </g>
    <g id="daemonset-animejs-app2" transform="translate(436 443)">
      <g transform="translate(.558 .863)">
        <path fill="#00C176" d="M110.880009,93.7313344 C110.880009,94.3229226 110.532834,94.8024074 110.104402,94.8024074 L0.775606353,94.8024074 C0.347174859,94.8024074 0,94.3229226 0,93.7313344 L4.4408921e-16,2.77200022 C2.56603935e-16,1.24106677 1.24106677,-3.27148577e-15 2.77200022,-3.55271368e-15 L108.108008,4.4408921e-16 C109.638942,1.62861298e-16 110.880009,1.24106677 110.880009,2.77200022 L110.880009,93.7313344 Z"/>
        <text fill="#FFF" font-size="18.85" font-weight="bold" class="sans-serif">
          <tspan x="36.061" y="60.243">APP</tspan>
        </text>
        <path fill="#CCC" d="M2.77200022,0 L108.108008,4.4408921e-16 C109.638942,1.62861298e-16 110.880009,1.24106677 110.880009,2.77200022 L110.880009,12.751201 L0,12.751201 L4.4408921e-16,2.77200022 C2.56603935e-16,1.24106677 1.24106677,7.25317122e-16 2.77200022,4.4408921e-16 Z"/>
        <path fill="#E74C3C" d="M9.42480074,6.93000054 C9.42480074,8.30799487 8.30799487,9.42480074 6.93000054,9.42480074 C5.55200621,9.42480074 4.43520035,8.30799487 4.43520035,6.93000054 C4.43520035,5.55200621 5.55200621,4.43520035 6.93000054,4.43520035 C8.30799487,4.43520035 9.42480074,5.55200621 9.42480074,6.93000054"/>
        <path fill="#F1C40F" d="M18.2952014,6.93000054 C18.2952014,8.30799487 17.1783956,9.42480074 15.8004012,9.42480074 C14.4224069,9.42480074 13.305601,8.30799487 13.305601,6.93000054 C13.305601,5.55200621 14.4224069,4.43520035 15.8004012,4.43520035 C17.1783956,4.43520035 18.2952014,5.55200621 18.2952014,6.93000054"/>
        <path fill="#2ECC71" d="M26.6112021,6.93000054 C26.6112021,8.30799487 25.4943962,9.42480074 24.1164019,9.42480074 C22.7384076,9.42480074 21.6216017,8.30799487 21.6216017,6.93000054 C21.6216017,5.55200621 22.7384076,4.43520035 24.1164019,4.43520035 C25.4943962,4.43520035 26.6112021,5.55200621 26.6112021,6.93000054"/>
      </g>
    </g>
    <g id="daemonset-animejs-app3" transform="translate(102 443)">
      <g transform="translate(.558 .863)">
        <path fill="#00C176" d="M110.880009,93.7313344 C110.880009,94.3229226 110.532834,94.8024074 110.104402,94.8024074 L0.775606353,94.8024074 C0.347174859,94.8024074 0,94.3229226 0,93.7313344 L4.4408921e-16,2.77200022 C2.56603935e-16,1.24106677 1.24106677,-3.27148577e-15 2.77200022,-3.55271368e-15 L108.108008,4.4408921e-16 C109.638942,1.62861298e-16 110.880009,1.24106677 110.880009,2.77200022 L110.880009,93.7313344 Z"/>
        <text fill="#FFF" font-size="18.85" font-weight="bold" class="sans-serif">
          <tspan x="36.061" y="60.243">APP</tspan>
        </text>
        <path fill="#CCC" d="M2.77200022,0 L108.108008,4.4408921e-16 C109.638942,1.62861298e-16 110.880009,1.24106677 110.880009,2.77200022 L110.880009,12.751201 L0,12.751201 L4.4408921e-16,2.77200022 C2.56603935e-16,1.24106677 1.24106677,7.25317122e-16 2.77200022,4.4408921e-16 Z"/>
        <path fill="#E74C3C" d="M9.42480074,6.93000054 C9.42480074,8.30799487 8.30799487,9.42480074 6.93000054,9.42480074 C5.55200621,9.42480074 4.43520035,8.30799487 4.43520035,6.93000054 C4.43520035,5.55200621 5.55200621,4.43520035 6.93000054,4.43520035 C8.30799487,4.43520035 9.42480074,5.55200621 9.42480074,6.93000054"/>
        <path fill="#F1C40F" d="M18.2952014,6.93000054 C18.2952014,8.30799487 17.1783956,9.42480074 15.8004012,9.42480074 C14.4224069,9.42480074 13.305601,8.30799487 13.305601,6.93000054 C13.305601,5.55200621 14.4224069,4.43520035 15.8004012,4.43520035 C17.1783956,4.43520035 18.2952014,5.55200621 18.2952014,6.93000054"/>
        <path fill="#2ECC71" d="M26.6112021,6.93000054 C26.6112021,8.30799487 25.4943962,9.42480074 24.1164019,9.42480074 C22.7384076,9.42480074 21.6216017,8.30799487 21.6216017,6.93000054 C21.6216017,5.55200621 22.7384076,4.43520035 24.1164019,4.43520035 C25.4943962,4.43520035 26.6112021,5.55200621 26.6112021,6.93000054"/>
      </g>
    </g>
    <g id="daemonset-animejs-app4" transform="translate(603 443)">
      <g transform="translate(.558 .863)">
        <path fill="#00C176" d="M110.880009,93.7313344 C110.880009,94.3229226 110.532834,94.8024074 110.104402,94.8024074 L0.775606353,94.8024074 C0.347174859,94.8024074 0,94.3229226 0,93.7313344 L4.4408921e-16,2.77200022 C2.56603935e-16,1.24106677 1.24106677,-3.27148577e-15 2.77200022,-3.55271368e-15 L108.108008,4.4408921e-16 C109.638942,1.62861298e-16 110.880009,1.24106677 110.880009,2.77200022 L110.880009,93.7313344 Z"/>
        <text fill="#FFF" font-size="18.85" font-weight="bold" class="sans-serif">
          <tspan x="36.061" y="60.243">APP</tspan>
        </text>
        <path fill="#CCC" d="M2.77200022,0 L108.108008,4.4408921e-16 C109.638942,1.62861298e-16 110.880009,1.24106677 110.880009,2.77200022 L110.880009,12.751201 L0,12.751201 L4.4408921e-16,2.77200022 C2.56603935e-16,1.24106677 1.24106677,7.25317122e-16 2.77200022,4.4408921e-16 Z"/>
        <path fill="#E74C3C" d="M9.42480074,6.93000054 C9.42480074,8.30799487 8.30799487,9.42480074 6.93000054,9.42480074 C5.55200621,9.42480074 4.43520035,8.30799487 4.43520035,6.93000054 C4.43520035,5.55200621 5.55200621,4.43520035 6.93000054,4.43520035 C8.30799487,4.43520035 9.42480074,5.55200621 9.42480074,6.93000054"/>
        <path fill="#F1C40F" d="M18.2952014,6.93000054 C18.2952014,8.30799487 17.1783956,9.42480074 15.8004012,9.42480074 C14.4224069,9.42480074 13.305601,8.30799487 13.305601,6.93000054 C13.305601,5.55200621 14.4224069,4.43520035 15.8004012,4.43520035 C17.1783956,4.43520035 18.2952014,5.55200621 18.2952014,6.93000054"/>
        <path fill="#2ECC71" d="M26.6112021,6.93000054 C26.6112021,8.30799487 25.4943962,9.42480074 24.1164019,9.42480074 C22.7384076,9.42480074 21.6216017,8.30799487 21.6216017,6.93000054 C21.6216017,5.55200621 22.7384076,4.43520035 24.1164019,4.43520035 C25.4943962,4.43520035 26.6112021,5.55200621 26.6112021,6.93000054"/>
      </g>
    </g>
  </g>
</svg>
<script src="anime.min.js"></script>
<script src="isScrolledIntoView.js"></script>
<script>
(function() {
  const svg = document.querySelector('#daemonset')
  const wrapper = document.createElement('div')
  wrapper.classList = 'relative'
  const restart = document.createElement('div')
  restart.classList = 'restart'
  restart.innerHTML = '<span>Restart</span>'
  wrap(svg, wrapper)
  wrapper.appendChild(restart)
  const basicTimeline = anime.timeline({
    autoplay: false,
  });
  basicTimeline
  .add({
    begin: function() {
      wrapper.onclick = function() {}
      restart.classList.add('inactive')
    }
  })
  .add({
    targets: '#daemonset-animejs-wifi-1',
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: '#daemonset-animejs-wifi-2',
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: '#daemonset-animejs-wifi-3',
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: ['#daemonset-animejs-app1', '#daemonset-animejs-app2',],
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: ['#daemonset-animejs-wifi-1', '#daemonset-animejs-wifi-2', '#daemonset-animejs-wifi-3',],
    opacity: [1, 0],
    easing: 'easeOutExpo',
  })
  .add({
    targets: '#daemonset-animejs-solar3',
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: ['#daemonset-animejs-wifi-1', '#daemonset-animejs-wifi-2', '#daemonset-animejs-wifi-3',],
    opacity: [0, 1],
    easing: 'easeOutExpo',
  })
  .add({
    targets: '#daemonset-animejs-app3',
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: ['#daemonset-animejs-wifi-1', '#daemonset-animejs-wifi-2', '#daemonset-animejs-wifi-3',],
    opacity: [1, 0],
    easing: 'easeOutExpo',
  })
  .add({
    targets: '#daemonset-animejs-solar4',
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: ['#daemonset-animejs-wifi-1', '#daemonset-animejs-wifi-2', '#daemonset-animejs-wifi-3',],
    opacity: [0, 1],
    easing: 'easeOutExpo',
  })
  .add({
    targets: '#daemonset-animejs-app4',
    opacity: [0, 1],
    easing: 'easeInExpo',
  })
  .add({
    targets: ['#daemonset-animejs-wifi-1', '#daemonset-animejs-wifi-2', '#daemonset-animejs-wifi-3',],
    opacity: [1, 0],
    easing: 'easeOutExpo',
  })
  .add({
    complete: function() {
      wrapper.onclick = basicTimeline.restart
      restart.classList.remove('inactive')
    }
  })
  wrapper.onclick = basicTimeline.restart
  onScrollIntoView(svg, function() {
    setTimeout(basicTimeline.play, 1000)
  });
  function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }
})();
</script>
```

So far so good.

You have:

- packaged applications as Linux containers
- a centralised way to distribute software securely and incrementally
- strategies to deploy applications across all devices (to prioritise hardware access), or across as few as possible (to maximise efficiency)
- a reliable platform that self-heals when there are failures

Considering that you started from nothing, you're now in a pretty good place.

Now you that you know what Kubernetes is capable of and how it can scale your internet of things, what's next?

## Running Kubernetes in cars

In June 2018 Redmonk wrote an article suggesting that [Toyota runs Kubernetes in their cars](https://redmonk.com/jgovernor/2018/06/28/rancher-labs-treating-cattle-like-cattle/).

You can imagine each small component in your car such as the dashboard, the radio functions or the side lights having their computer with a Kubernetes agent installed.

The components are connected and can communicate using the internal network.

The kubernetes master is in charge of making sure that the services are always up and running, as well as scheduling deployments.

_Need to replace the dashboard?_

Just replace the component and Kubernetes will schedule the software to run on the embedded computer.

_Adding a GPS?_

No problem.

Join the device to the cluster and start streaming the data.

**In the beginning, it might sound odd.**

But if you think about it, it makes sense.

You have to connect those components and orchestrate them.

You can't have the front lights disconnected from the dashboard.

But it turned out that it wasn't right.

Toyota didn't run Kubernetes in their cars, but they used Kubernetes as part of their backend services.

Once you connect the car to one of their diagnostic tools, the data is extracted from the vehicle and ingested into a Kubernetes cluster that's designed to run in the cloud.

A few days after the article's publication, Redmonk amended the article to clarify this.

Even if the story was untrue and was just a result of a misunderstanding, it still makes you think.

_What if?_

## What if you could run Kubernetes in a car?

_And what's stopping you from using Kubernetes in a solar plant?_

_Or in any other internet of things device?_

You could solve some of the hard challenges such as securing communications, delivering incremental updates and centrally controlling your fleet.

You could have the best time to market for your internet of things.

Hundreds of days of development saved because you can reuse a proven tool.

While Kubernetes was initially designed to run in data centres, its applications go well beyond the cloud, and it won't take long before the news come out of kubernetes used in another internet of things setup.

And I can't wait to hear what you're going to build next with it.

## That's all folks!

Thanks to [Aled James](https://www.linkedin.com/in/aledjames/) (University of Bristol), and [Joe Heck](https://twitter.com/heckj) for their feedback!
