'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    _tpt: any;
    SR7: any;
  }
}

export default function SR7Slider() {
  const initialized = useRef(false);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (initialized.current) return;
    
    // Wait for all scripts to be available
    const initSR7 = () => {
      if (!window._tpt || !window.SR7) {
        console.log('Waiting for SR7 scripts...');
        setTimeout(initSR7, 100);
        return;
      }

      initialized.current = true;

      // Initialize SR7 global objects
      window._tpt ??= {};
      window.SR7 ??= {};
      window._tpt.R ??= {};
      window._tpt.R.fonts ??= {};
      window._tpt.R.fonts.customFonts ??= {};
      
      window.SR7.devMode = false;
      window.SR7.F ??= {};
      window.SR7.G ??= {};
      window.SR7.LIB ??= {};
      window.SR7.E ??= {};
      window.SR7.E.gAddons ??= {};
      window.SR7.E.php ??= {};
      window.SR7.E.nonce = '9b5f3dbf85';
      window.SR7.E.ajaxurl = '';
      window.SR7.E.resturl = '';
      window.SR7.E.slug_path = 'revslider/revslider.php';
      window.SR7.E.slug = 'revslider';
      window.SR7.E.plugin_url = '';
      window.SR7.E.wp_plugin_url = '';
      window.SR7.E.revision = '6.7.39';
      window.SR7.E.fontBaseUrl = '';
      window.SR7.G.breakPoints = [1240, 1024, 778, 480];
      window.SR7.G.fSUVW = false;
      window.SR7.E.modules = ['module', 'page', 'slide', 'layer', 'draw', 'animate', 'srtools', 'canvas', 'defaults', 'carousel', 'navigation', 'media', 'modifiers'];
      window.SR7.E.libs = ['WEBGL'];
      window.SR7.E.css = ['csslp', 'cssbtns', 'cssfilters', 'cssnav', 'cssmedia'];
      window.SR7.E.resources = {};
      window.SR7.E.ytnc = false;
      window.SR7.JSON ??= {};
      window.SR7.E.resources.transitionpack = "revslider-transitionpack-addon/public/js/transitionpack.js";
      window.SR7.E.resources.tpackURL = "./revslider-transitionpack-addon/";
      window.SR7.JSON['SR7_2_1'] = 'assets/SR7_2_1.json';
      window.SR7.E.v6v7ids ??= {};
      window.SR7.E.v6v7ids = JSON.parse('{"n":{"7":8,"8":9,"9":10,"10":11,"11":12,"12":13},"s":{"2":14}}');

      // Initialize module height
      window.SR7.PMH ??= {};
      window.SR7.PMH["SR7_2_1"] = {
        cn: 100,
        state: false,
        fn: function() {
          if (window._tpt !== undefined && window._tpt.prepareModuleHeight !== undefined) {
            window._tpt.prepareModuleHeight({
              id: "SR7_2_1",
              el: [900, 900, 768, 960, 720],
              type: 'standard',
              shdw: '0',
              gh: [900, 900, 768, 960, 720],
              gw: [1240, 1240, 1024, 778, 480],
              vpt: ['-100px', '-100px', '-100px', '-100px', '-100px'],
              size: { fullWidth: true, fullHeight: true },
              fho: '',
              mh: '0',
              onh: 0,
              onw: 0,
              bg: { color: '{"type":"solid","orig":"#0c0c0c","string":"rgba(12, 12, 12, 1)"}' }
            });
            window.SR7.PMH["SR7_2_1"].state = true;
          } else if (window.SR7.PMH["SR7_2_1"].cn-- > 0) {
            setTimeout(window.SR7.PMH["SR7_2_1"].fn, 19);
          }
        }
      };

      // Run initialization
      setTimeout(() => {
        if (window.SR7?.PMH?.["SR7_2_1"]) {
          window.SR7.PMH["SR7_2_1"].fn();
        }
        
        if (window.SR7?.F?.init) {
          window.SR7.F.init();
        } else {
          window.SR7.shouldBeInited = true;
        }
      }, 500);
    };

    if (scriptsLoaded) {
      initSR7();
    }
  }, [scriptsLoaded]);

  const handleScriptLoad = () => {
    setScriptsLoaded(true);
  };

  return (
    <>
      <Script 
        src="/js/libs/tptools.js" 
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      <Script 
        src="/js/sr7.js" 
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      <Script 
        src="/js/page.js" 
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />

      <p className="rs-p-wp-fix"></p>
      
      {/* @ts-ignore */}
      <sr7-module 
        data-alias="zero-point-energy-drink-showcase-template-1" 
        data-id="2" 
        id="SR7_2_1" 
        className="rs-ov-hidden" 
        data-version="6.7.39"
      >
        {/* @ts-ignore */}
        <sr7-adjuster></sr7-adjuster>
        {/* @ts-ignore */}
        <sr7-content>
          
          {/* Slide 1 */}
          {/* @ts-ignore */}
          <sr7-slide id="SR7_2_1-8" data-key="8">
            {/* @ts-ignore */}
            <sr7-bg id="SR7_2_1-8-47" className="sr7-layer">
              <noscript><img src="/assets/s-bg1.jpg" alt="" title="s-bg1.jpg" /></noscript>
            {/* @ts-ignore */}
            </sr7-bg>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-8-4" className="sr7-layer">Starnext</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-8-20" className="sr7-layer">Best Digital Marketing In uttrakhand</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-8-24" className="sr7-layer">With the years of experience in Digital and Development industry Starnext Softech delivering, fulfilling and achieving their customers dreams and needs.</sr7-txt>
            <a id="SR7_2_1-8-31" className="sr7-layer" href="" target="_blank" rel="noopener">Call Now</a>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-8-38" className="sr7-layer">Graphics and Video editings</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-8-42" className="sr7-layer">Social media</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-8-43" className="sr7-layer">Website Devlopment</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-8-44" className="sr7-layer">Digital Marketing</sr7-txt>
          {/* @ts-ignore */}
          </sr7-slide>

          {/* Slide 2 */}
          {/* @ts-ignore */}
          <sr7-slide id="SR7_2_1-13" data-key="13">
            {/* @ts-ignore */}
            <sr7-bg id="SR7_2_1-13-47" className="sr7-layer">
              <noscript><img src="/assets/s-bg3.jpg" alt="" title="s-bg3.jpg" /></noscript>
            {/* @ts-ignore */}
            </sr7-bg>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-13-4" className="sr7-layer">Website</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-13-20" className="sr7-layer">Best Web Designing Company in Dehradun</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-13-21" className="sr7-layer">&gt;&gt;&gt;</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-13-22" className="sr7-layer">&gt;&gt;&gt;</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-13-23" className="sr7-layer">&gt;&gt;&gt;</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-13-24" className="sr7-layer">StarNext Softech is a fast-growing and best website designing company in Dehradun, Uttarakhand. We specialize in the best website design and development services.</sr7-txt>
            <a id="SR7_2_1-13-31" className="sr7-layer" href="" target="_blank" rel="noopener">Call Now</a>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-13-38" className="sr7-layer">Graphics and Video editing</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-13-42" className="sr7-layer">Website Devlopment</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-13-43" className="sr7-layer">Social media</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-13-44" className="sr7-layer">Digital Marketing</sr7-txt>
          {/* @ts-ignore */}
          </sr7-slide>

          {/* Slide 3 */}
          {/* @ts-ignore */}
          <sr7-slide id="SR7_2_1-12" data-key="12">
            {/* @ts-ignore */}
            <sr7-bg id="SR7_2_1-12-47" className="sr7-layer">
              <noscript><img src="/assets/s-bg2.jpg" alt="" title="s-bg2.jpg" /></noscript>
            {/* @ts-ignore */}
            </sr7-bg>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-12-4" className="sr7-layer">Video</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-12-20" className="sr7-layer">Best Graphics Video and Photography Company in Dehradun</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-12-21" className="sr7-layer">&gt;&gt;&gt;</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-12-22" className="sr7-layer">&gt;&gt;&gt;</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-12-23" className="sr7-layer">&gt;&gt;&gt;</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-12-24" className="sr7-layer">At StarNext Softech we have a team of photo stylists, photo editors, photographer and videographers to ensure that the right story is portrayed in your imagery.</sr7-txt>
            <a id="SR7_2_1-12-31" className="sr7-layer" href="" target="_blank" rel="noopener">call now</a>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-12-38" className="sr7-layer">Social media</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-12-42" className="sr7-layer">Website Devlopment</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-12-43" className="sr7-layer">Graphics And Video Editing</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-12-44" className="sr7-layer">Digital Marketing</sr7-txt>
          {/* @ts-ignore */}
          </sr7-slide>

          {/* Slide 4 */}
          {/* @ts-ignore */}
          <sr7-slide id="SR7_2_1-11" data-key="11">
            {/* @ts-ignore */}
            <sr7-bg id="SR7_2_1-11-47" className="sr7-layer">
              <noscript><img src="/assets/s-bg4-1.jpg" alt="" title="s-bg4-1.jpg" /></noscript>
            {/* @ts-ignore */}
            </sr7-bg>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-11-4" className="sr7-layer">Social Media</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-11-20" className="sr7-layer">Best Social Media Marketing Company in Dehradun</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-11-21" className="sr7-layer">&gt;&gt;&gt;</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-11-22" className="sr7-layer">&gt;&gt;&gt;</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-11-23" className="sr7-layer">&gt;&gt;&gt;</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-11-24" className="sr7-layer">StarNext Softech is a social media marketing company with extensive experience in social media marketing services. Our goal is to be the best social media marketing company on the planet!</sr7-txt>
            <a id="SR7_2_1-11-31" className="sr7-layer" href="" target="_blank" rel="noopener">CALL NOW</a>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-11-38" className="sr7-layer">SOCIAL MEDIA</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-11-42" className="sr7-layer">GRAPHICS AND VIDEO EDITING</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-11-43" className="sr7-layer">WEBSITE DEVLOPMENT</sr7-txt>
            {/* @ts-ignore */}
            <sr7-txt id="SR7_2_1-11-44" className="sr7-layer">DIGITAL MARKETING</sr7-txt>
          {/* @ts-ignore */}
          </sr7-slide>

          {/* @ts-ignore */}
          <sr7-slide id="SR7_2_1-14" data-key="14"></sr7-slide>
        {/* @ts-ignore */}
        </sr7-content>
      {/* @ts-ignore */}
      
      </sr7-module>
      
      
    </>
    
    
  );
}