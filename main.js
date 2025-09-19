/* eslint-disable no-undef */
// Gerador de Carrossel LinkedIn
// - Cria slides 670x850 (preview em 50%)
// - Exporta para PDF com html2pdf

(function init() {
  const wrapper = document.getElementById('slidesWrapper');
  const btnSetLogo = document.getElementById('btnSetLogo');
  const logoInput = document.getElementById('logoInput');
  const imageInput = document.getElementById('imageInput');
  const btnExport = document.getElementById('btnExport');
  const templateButtons = document.querySelectorAll('.template-card');
  const brandNameInput = document.getElementById('brandNameInput');
  const accentInput = document.getElementById('accentInput');
  const inkInput = document.getElementById('inkInput');
  const backgroundInput = document.getElementById('backgroundInput');
  const shapeSelect = document.getElementById('shapeSelect');
  const shapeOpacity = document.getElementById('shapeOpacity');
  const overlayColorInput = document.getElementById('overlayColorInput');
  const overlayOpacityGlobal = document.getElementById('overlayOpacityGlobal');
  const fontSelect = document.getElementById('fontSelect');
  // exportScale is fixed to 8 (no UI control)

  const state = {
    brandName: 'Plati AI',
    logoDataUrl: null,
  };

  // Helpers
  function el(tag, className, html) {
    const e = document.createElement(tag);
    if (className) e.className = className;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }


  function limitSlides() {
    const count = wrapper.querySelectorAll('.slide').length;
    return count < 10;
  }

  function makeToolbar(slide) {
    const bar = el('div', 'slide-toolbar');
    const btnDuplicate = el('button', 'icon-btn', '⧉');
    const btnDelete = el('button', 'icon-btn', '✕');
    const btnBg = el('button', 'icon-btn small', 'BG');
    btnDuplicate.title = 'Duplicar';
    btnDelete.title = 'Excluir';
    btnBg.title = 'Slide background…';
    btnDuplicate.onclick = (e) => {
      e.stopPropagation();
      if (!limitSlides()) return;
      const clone = slide.cloneNode(true);
      hydrateSlide(clone);
      wrapper.appendChild(clone);
    };
    btnDelete.onclick = (e) => {
      e.stopPropagation();
      slide.remove();
    };
    btnBg.onclick = (e) => {
      e.stopPropagation();
      imageInput.onchange = (ev) => {
        const file = ev.target.files && ev.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = () => {
          let bgLayer = slide.querySelector('.bg-layer');
          let shadeLayer = slide.querySelector('.shade-layer');
          if (!bgLayer) {
            bgLayer = el('div', 'bg-layer');
            slide.prepend(bgLayer);
          }
          if (!shadeLayer) {
            shadeLayer = el('div', 'shade-layer');
            slide.appendChild(shadeLayer);
          }
          bgLayer.style.backgroundImage = `url(${reader.result})`;
          bgLayer.style.backgroundSize = 'cover';
          bgLayer.style.backgroundPosition = 'center';
          bgLayer.style.backgroundRepeat = 'no-repeat';
          
          // Remove qualquer controle antigo por slide e aplica configuração global atual
          const oldOc = slide.querySelector('.overlay-control');
          if (oldOc) oldOc.remove();
          if (typeof overlayColorInput !== 'undefined' && typeof overlayOpacityGlobal !== 'undefined') {
            const alpha = Number(overlayOpacityGlobal.value || 30) / 100;
            shadeLayer.style.background = hexToRgba(overlayColorInput.value || '#000000', alpha);
          }
        };
        reader.readAsDataURL(file);
      };
      imageInput.click();
    };
    bar.append(btnDuplicate, btnDelete, btnBg);
    return bar;
  }

  function makeLogoAndBrand() {
    const container = el('div', 'brand-footer');
    const logo = el('div', 'logo-slot');
    
    if (state.logoDataUrl) {
      const logoImg = document.createElement('img');
      logoImg.src = state.logoDataUrl;
      logoImg.style.width = '100%';
      logoImg.style.height = '100%';
      logoImg.style.objectFit = 'cover';
      logoImg.style.borderRadius = '50%';
      logoImg.setAttribute('crossorigin', 'anonymous');
      logo.appendChild(logoImg);
      logo.style.border = 'none';
    } else {
      logo.textContent = 'logo';
    }
    
    const brand = el('div', 'brand-name', state.brandName);
    container.append(logo, brand);
    return { logo, brand, container };
  }
  // padrões de bolinhas removidos

  function hydrateSlide(slide) {
    // reconectar handlers após clone
    const toolbar = slide.querySelector('.slide-toolbar');
    if (toolbar) toolbar.remove();
    slide.prepend(makeToolbar(slide));
    applyGlobalsToSlide(slide);
  }

  function addCover() {
    if (!limitSlides()) return;
    const slide = el('article', 'slide cover');
    slide.appendChild(makeToolbar(slide));
    const frame = el('div', 'frame');
    const color = el('div', 'color-layer');
    const bg = el('div', 'bg-layer');
    const shape = el('div', 'shape-layer');
    const shade = el('div', 'shade-layer');

    const eyebrow = el('div', 'subtitle accent', 'Avengers');
    const title = el('h1', 'title', 'Avengers Assemble');
    title.contentEditable = 'true';
    const subtitle = el('p', 'subtitle');
    subtitle.innerHTML = 'From UI to UAI — designing for heroes that think and act. Whatever it takes.';
    subtitle.contentEditable = 'true';

    const band = el('div', 'accent-band');

    const { container } = makeLogoAndBrand();
    frame.append(eyebrow, title, subtitle, band);
    slide.append(color, bg, shape, shade, frame, container);
    wrapper.appendChild(slide);
    applyGlobalsToSlide(slide);
  }

  function addBullets() {
    if (!limitSlides()) return;
    const slide = el('article', 'slide text');
    slide.appendChild(makeToolbar(slide));
    const frame = el('div', 'frame');
    const color = el('div', 'color-layer');
    const bg = el('div', 'bg-layer');
    const shape = el('div', 'shape-layer');
    const shade = el('div', 'shade-layer');

    const callout = el('div', 'callout', 'Avengers brief');
    callout.contentEditable = 'true';
    const list = el('div');
    const bullets = [
      'Assemble the right team for each mission.',
      'Plan the battle: one clear objective per slide.',
      'Deliver the punchline with color and contrast.'
    ];
    bullets.forEach((t) => {
      const b = el('p', 'bullet', t);
      b.contentEditable = 'true';
      list.appendChild(b);
    });

    const { container } = makeLogoAndBrand();
    frame.append(callout, list);
    slide.append(color, bg, shape, shade, frame, container);
    wrapper.appendChild(slide);
    applyGlobalsToSlide(slide);
  }

  function addStatement() {
    if (!limitSlides()) return;
    const slide = el('article', 'slide text');
    slide.appendChild(makeToolbar(slide));
    const frame = el('div', 'frame');
    const color = el('div', 'color-layer');
    const bg = el('div', 'bg-layer');
    const shape = el('div', 'shape-layer');
    const shade = el('div', 'shade-layer');
    const title = el('h2', 'title', 'We have a Hulk.');
    title.contentEditable = 'true';
    const sub = el('p', 'subtitle', 'But strategy beats brute force — every time.');
    sub.contentEditable = 'true';
    const { container } = makeLogoAndBrand();
    frame.append(title, sub);
    slide.append(color, bg, shape, shade, frame, container);
    wrapper.appendChild(slide);
    applyGlobalsToSlide(slide);
  }

  function addSteps() {
    if (!limitSlides()) return;
    const slide = el('article', 'slide text');
    slide.appendChild(makeToolbar(slide));
    const frame = el('div', 'frame');
    const color = el('div', 'color-layer');
    const bg = el('div', 'bg-layer');
    const shape = el('div', 'shape-layer');
    const shade = el('div', 'shade-layer');
    const callout = el('div', 'callout', 'Battle plan');
    callout.contentEditable = 'true';
    const list = el('div');
    const steps = ['Assemble the team', 'Define the mission', 'Execute with precision'];
    steps.forEach((t, i) => {
      const p = el('p', 'bullet', `<strong>${i + 1}.</strong> ${t}`);
      p.contentEditable = 'true';
      list.appendChild(p);
    });
    const { container } = makeLogoAndBrand();
    frame.append(callout, list);
    slide.append(color, bg, shape, shade, frame, container);
    wrapper.appendChild(slide);
    applyGlobalsToSlide(slide);
  }

  function addImageSlide() {
    if (!limitSlides()) return;
    const slide = el('article', 'slide text');
    slide.appendChild(makeToolbar(slide));
    const frame = el('div', 'frame');
    const color = el('div', 'color-layer');
    const bg = el('div', 'bg-layer');
    const shape = el('div', 'shape-layer');
    const shade = el('div', 'shade-layer');
    const title = el('h2', 'title', 'Arc Reactor spotlight');
    title.contentEditable = 'true';
    const imgBox = el('div');
    imgBox.className = 'image-container';
    imgBox.style.border = '1px dashed var(--muted)';
    const btn = el('button', 'btn', 'Escolher imagem…');
    btn.onclick = () => {
      imageInput.onchange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = () => {
          // Criar elemento img para melhor qualidade na exportação
          const img = document.createElement('img');
          img.src = reader.result;
          img.style.width = '100%';
          img.style.height = '100%';
          img.style.objectFit = 'cover';
          img.style.borderRadius = '12px';
          img.setAttribute('crossorigin', 'anonymous');
          
          // Aguarda o carregamento da imagem
          img.onload = () => {
            imgBox.style.border = 'none';
            imgBox.innerHTML = '';
            imgBox.appendChild(img);
          };
        };
        reader.readAsDataURL(file);
      };
      imageInput.click();
    };
    imgBox.appendChild(btn);
    const { container } = makeLogoAndBrand();
    frame.append(title, imgBox);
    slide.append(color, bg, shape, shade, frame, container);
    wrapper.appendChild(slide);
    applyGlobalsToSlide(slide);
  }

  function addClosing() {
    if (!limitSlides()) return;
    const slide = el('article', 'slide closing');
    slide.appendChild(makeToolbar(slide));
    const frame = el('div', 'frame');
    const color = el('div', 'color-layer');
    const bg = el('div', 'bg-layer');
    const shape = el('div', 'shape-layer');
    const shade = el('div', 'shade-layer');
    const title = el('h2', 'title', 'Ready to assemble?');
    title.contentEditable = 'true';
    const subtitle = el('p', 'subtitle', "Follow for more tactical moves from Earth’s Mightiest Designers.");
    subtitle.contentEditable = 'true';
    const cta = el('a', 'cta', 'Leave a comment, hero!');
    cta.href = '#';
    cta.contentEditable = 'true';
    const { container } = makeLogoAndBrand();
    frame.append(title, subtitle, cta);
    slide.append(color, bg, shape, shade, frame, container);
    wrapper.appendChild(slide);
    applyGlobalsToSlide(slide);
  }

  function buildExportDom() {
    // Cria um container oculto com slides em 670x850
    let exportRoot = document.getElementById('exportRoot');
    if (exportRoot) exportRoot.remove();
    exportRoot = el('div');
    exportRoot.id = 'exportRoot';

    const slides = [...wrapper.querySelectorAll('.slide')];
    slides.forEach((slide) => {
      const clone = slide.cloneNode(true);
      clone.classList.add('slide-export');
      // Use o mesmo tamanho do editor (335x425) e renderize em escala 2 para obter 670x850.
      clone.style.width = '335px';
      clone.style.height = '425px';
      // Remover toolbar ao exportar
      const tb = clone.querySelector('.slide-toolbar');
      if (tb) tb.remove();
      // Mantém o mesmo padding do editor para evitar diferenças visuais
      // Melhor tipografia em export
      const title = clone.querySelector('.title');
      if (title) title.style.letterSpacing = '-0.5px';
      // Força branco puro para fundo
      clone.style.background = '#ffffff';
      clone.classList.add('pagebreak');
      exportRoot.appendChild(clone);
    });
    document.body.appendChild(exportRoot);
    return exportRoot;
  }

  async function exportPdf() {
    const slideCount = wrapper.querySelectorAll('.slide').length;
    if (slideCount < 2) {
      alert('Crie ao menos 2 slides para exportar.');
      return;
    }
    // Aguarda fontes para evitar renderização vazia
    if (document.fonts && document.fonts.ready) {
      try { await document.fonts.ready; } catch (_) { /* ignore */ }
    }
    const exportRoot = buildExportDom();
    const pages = [...exportRoot.children];
    // Garante que imagens de fundo carregadas via dataURL foram aplicadas
    await new Promise((res) => setTimeout(res, 50));

    const JSPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : null;
    if (!JSPDF) {
      alert('jsPDF não carregado. Verifique a conexão com cdn.jsdelivr.');
      return;
    }
    const pdf = new JSPDF({ unit: 'px', format: [670, 850], orientation: 'portrait' });

    for (let i = 0; i < pages.length; i += 1) {
      const node = pages[i];
      // Renderiza cada slide de forma independente
      // eslint-disable-next-line no-await-in-loop
      const scale = 8;
      const canvas = await window.html2canvas(node, { 
        scale, 
        useCORS: true, 
        backgroundColor: '#ffffff', 
        logging: false, 
        allowTaint: true, 
        letterRendering: true,
        imageTimeout: 10000
      });
      // Usar qualidade PNG alta para preservar detalhes das imagens
      const img = canvas.toDataURL('image/png');
      if (i > 0) pdf.addPage([670, 850], 'portrait');
      // Usar compressão FAST (padrão funcional)
      pdf.addImage(img, 'PNG', 0, 0, 670, 850, undefined, 'FAST');
    }
    pdf.save('carrossel-linkedin.pdf');
    exportRoot.remove();
  }

  // Listeners
  btnSetLogo.addEventListener('click', () => logoInput.click());
  logoInput.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      state.logoDataUrl = reader.result;
      // Atualiza todos os slots existentes
      document.querySelectorAll('.logo-slot').forEach((slot) => {
        // Limpa conteúdo anterior
        // eslint-disable-next-line no-param-reassign
        slot.innerHTML = '';
        // eslint-disable-next-line no-param-reassign
        slot.style.border = 'none';
        
        // Criar elemento img para o logo
        const logoImg = document.createElement('img');
        logoImg.src = state.logoDataUrl;
        logoImg.style.width = '100%';
        logoImg.style.height = '100%';
        logoImg.style.objectFit = 'cover';
        logoImg.style.borderRadius = '50%';
        logoImg.setAttribute('crossorigin', 'anonymous');
        slot.appendChild(logoImg);
      });
    };
    reader.readAsDataURL(file);
  });
  brandNameInput.addEventListener('input', () => {
    state.brandName = brandNameInput.value || 'Plati AI';
    document.querySelectorAll('.brand-name').forEach((elx) => { elx.textContent = state.brandName; });
  });
  // cores dinâmicas
  function updateCssVars() {
    const root = document.documentElement;
    if (accentInput.value) root.style.setProperty('--accent', accentInput.value);
    if (inkInput.value) root.style.setProperty('--ink', inkInput.value);
  }
  [accentInput, inkInput].forEach((inp) => inp.addEventListener('input', updateCssVars));
  // background agora afeta todos os slides (frames)
  function applyBackgroundToAll(color) {
    // Garante a existência da color-layer em TODOS os slides e aplica a cor
    document.querySelectorAll('.slide').forEach((slide) => {
      let layer = slide.querySelector('.color-layer');
      if (!layer) {
        layer = el('div', 'color-layer');
        slide.insertBefore(layer, slide.firstChild);
      }
      layer.style.background = color;
    });
  }
  backgroundInput.addEventListener('input', () => applyBackgroundToAll(backgroundInput.value));
  // Templates
  templateButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-template');
      if (type === 'cover') addCover();
      else if (type === 'bullets') addBullets();
      else if (type === 'statement') addStatement();
      else if (type === 'steps') addSteps();
      else if (type === 'image') addImageSlide();
      else if (type === 'closing') addClosing();
    });
  });
  btnExport.addEventListener('click', exportPdf);

  // Aplicar tema a todos: reescreve variáveis CSS e força re-render
  // As mudanças são aplicadas ao vivo pelos inputs; não há mais botão de aplicar

  function shapeSvg(type, opacity) {
    const o = typeof opacity === 'number' ? opacity : 0.3;
    switch (type) {
      case 'blob':
        return `<svg viewBox="0 0 670 850" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="var(--accent)" stop-opacity="${o+0.05}"/><stop offset="100%" stop-color="var(--accent)" stop-opacity="${o/2}"/></linearGradient></defs><path d="M140,80 C360,120 520,60 620,200 C720,340 560,520 360,600 C160,680 60,580 40,420 C20,260 -80,120 140,80 Z" fill="url(#g)"/></svg>`;
      case 'rings':
        return `<svg viewBox=\"0 0 670 850\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"550\" cy=\"120\" r=\"90\" stroke=\"var(--accent)\" stroke-width=\"20\" fill=\"none\" opacity=\"${o}\"/><circle cx=\"90\" cy=\"760\" r=\"60\" stroke=\"#ccc\" stroke-width=\"10\" fill=\"none\" opacity=\"${Math.max(0,o-0.1)}\"/></svg>`;
      case 'waves':
        return `<svg viewBox=\"0 0 670 850\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0,200 C120,240 220,160 340,200 C460,240 540,200 670,240 L670,0 L0,0 Z\" fill=\"var(--accent)\" opacity=\"${o}\"/><path d=\"M0,260 C120,300 220,220 340,260 C460,300 540,260 670,300 L670,220 L0,220 Z\" fill=\"#eaeaea\" opacity=\"${Math.max(0,o-0.15)}\"/></svg>`;
      case 'diagonal':
        return `<svg viewBox=\"0 0 670 850\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0,0 L670,0 L670,240 L0,420 Z\" fill=\"var(--accent)\" opacity=\"${o}\"/></svg>`;
      case 'grid':
        return `<svg viewBox=\"0 0 670 850\" xmlns=\"http://www.w3.org/2000/svg\">${Array.from({length:20}).map((_,i)=>`<line x1=\"${i*35}\" y1=\"0\" x2=\"${i*35}\" y2=\"850\" stroke=\"#dcdcdc\" opacity=\"${Math.max(0,o-0.15)}\"/>`).join('')}${Array.from({length:25}).map((_,i)=>`<line x1=\"0\" y1=\"${i*34}\" x2=\"670\" y2=\"${i*34}\" stroke=\"#dcdcdc\" opacity=\"${Math.max(0,o-0.15)}\"/>`).join('')}</svg>`;
      case 'dots':
        return `<svg viewBox=\"0 0 670 850\" xmlns=\"http://www.w3.org/2000/svg\">${Array.from({length:22}).map((_,r)=>Array.from({length:14}).map((_,c)=>`<circle cx=\"${30+c*45}\" cy=\"${30+r*36}\" r=\"3\" fill=\"#bdbdbd\" opacity=\"${Math.max(0,o-0.2)}\"/>`).join('')).join('')}</svg>`;
      case 'arc':
        return `<svg viewBox=\"0 0 670 850\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0,0 A220,220 0 0 0 220,220 L0,220 Z\" fill=\"var(--accent)\" opacity=\"${o}\"/></svg>`;
      case 'zigzag':
        return `<svg viewBox=\"0 0 670 850\" xmlns=\"http://www.w3.org/2000/svg\"><polyline points=\"0,120 80,80 160,140 240,100 320,160 400,120 480,180 560,140 640,200 670,180\" fill=\"none\" stroke=\"var(--accent)\" stroke-width=\"14\" opacity=\"${o}\"/></svg>`;
      default: return '';
    }
  }

  function applyShapeToAll(type, opacity) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide) => {
      let shapeLayer = slide.querySelector('.shape-layer');
      if (!shapeLayer) {
        shapeLayer = el('div', 'shape-layer');
        slide.appendChild(shapeLayer);
      }
      if (type === 'none') {
        shapeLayer.innerHTML = '';
      } else {
        shapeLayer.innerHTML = shapeSvg(type, opacity);
      }
    });
  }

  function applyGlobalsToSlide(slide) {
    // aplica background cor
    let colorLayer = slide.querySelector('.color-layer');
    if (!colorLayer) {
      colorLayer = el('div', 'color-layer');
      slide.insertBefore(colorLayer, slide.firstChild);
    }
    colorLayer.style.background = backgroundInput.value || '#FFFFFF';

    // aplica shape
    let shapeLayer = slide.querySelector('.shape-layer');
    if (!shapeLayer) {
      shapeLayer = el('div', 'shape-layer');
      slide.appendChild(shapeLayer);
    }
    const so = Number(shapeOpacity.value) / 100;
    shapeLayer.innerHTML = shapeSelect.value === 'none' ? '' : shapeSvg(shapeSelect.value, so);

    // aplica overlay
    let shadeLayer = slide.querySelector('.shade-layer');
    if (!shadeLayer) {
      shadeLayer = el('div', 'shade-layer');
      slide.appendChild(shadeLayer);
    }
    const oa = Number(overlayOpacityGlobal.value) / 100;
    shadeLayer.style.background = hexToRgba(overlayColorInput.value || '#000000', oa);

    // remove backgrounds estáticos inline dos frames para não sobrescrever a color-layer
    const frame = slide.querySelector('.frame');
    if (frame) frame.style.background = 'transparent';
  }

  function applyOverlayToAll(color, opacity) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide) => {
      let shadeLayer = slide.querySelector('.shade-layer');
      if (!shadeLayer) {
        shadeLayer = el('div', 'shade-layer');
        slide.appendChild(shadeLayer);
      }
      const alpha = Math.min(1, Math.max(0, opacity));
      shadeLayer.style.background = `${hexToRgba(color, alpha)}`;
    });
  }

  function hexToRgba(hex, a) {
    const h = hex.replace('#', '');
    const bigint = parseInt(h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  // Controls on left sidebar
  shapeSelect.addEventListener('change', () => applyShapeToAll(shapeSelect.value, Number(shapeOpacity.value) / 100));
  shapeOpacity.addEventListener('input', () => applyShapeToAll(shapeSelect.value, Number(shapeOpacity.value) / 100));
  overlayColorInput.addEventListener('input', () => applyOverlayToAll(overlayColorInput.value, Number(overlayOpacityGlobal.value) / 100));
  overlayOpacityGlobal.addEventListener('input', () => applyOverlayToAll(overlayColorInput.value, Number(overlayOpacityGlobal.value) / 100));
  // aplica imediatamente configs globais nos slides já existentes ao carregar
  window.addEventListener('load', () => {
    // defaults: blob shape + overlay 0
    if (shapeSelect) shapeSelect.value = 'blob';
    if (overlayOpacityGlobal) overlayOpacityGlobal.value = 0;
    applyBackgroundToAll(backgroundInput.value || '#FFFFFF');
    applyShapeToAll('blob', Number(shapeOpacity.value) / 100);
    applyOverlayToAll(overlayColorInput.value, 0);
  });
  fontSelect.addEventListener('change', () => {
    const family = fontSelect.value;
    document.documentElement.style.setProperty('--font-ui', `'${family}'`);
  });

  // Capas e textos iniciais
  addCover();
  addBullets();
  addClosing();
})();


