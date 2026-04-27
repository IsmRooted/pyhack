# Contribuir a PyHack

¡Gracias por interesarte! PyHack se mantiene como proyecto pequeño y los pulls bienvenidos siempre son revisados.

## Antes de empezar — leer

1. [`SECURITY.md`](SECURITY.md) — la **heurística editorial** que decide qué contenido se acepta. Crítico si vas a añadir niveles o material pedagógico.
2. [`docs/PEDAGOGICAL_PLAN.md`](docs/PEDAGOGICAL_PLAN.md) — sistema pedagógico completo, plantillas de calidad, convenciones de estilo.

## Cómo desarrollar localmente

Sin dependencias `npm`. Solo necesitas Python para servir los archivos:

```bash
git clone https://github.com/IsmRooted/pyhack.git
cd pyhack
python3 -m http.server 8000
```

Edita los archivos, refresca el navegador con `Shift+F5` (cache busting).

### Validar antes de pushear

```bash
# Sintaxis de todos los JS
for f in js/*.js; do node --check "$f" || echo "FAIL: $f"; done

# Las soluciones cumplen sus propias regex de validación
node -e "
global.window={};
const fs=require('fs');
const L=new Function(fs.readFileSync('js/levels.js','utf8')+';return LEVELS;')();
const fails=[];
L.forEach(l => {
  const code = l.solution || l.hint || '';
  if (!code || code.includes('Sin pista') || code.includes('EXAMEN FINAL')) return;
  const checks = [].concat(l.requires || [], l.restrictions || []);
  checks.forEach(c => {
    if (c.type === 'mustContain' && c.regex && !c.regex.test(code)) {
      fails.push('L'+l.id+': \"'+c.message+'\"');
    }
  });
});
console.log(fails.length ? 'FAILS:\n  '+fails.join('\n  ') : 'OK: solutions match validators');
"
```

## Tipos de contribuciones bienvenidas

### Bugs / fixes técnicos
Abre un issue describiendo el bug. Si tienes el fix, PR directo.

### Glosario y cheatsheet
Ampliar `js/glossary.js` con más términos o `js/cheatsheet.js` con más entradas de stdlib o sintaxis Python no es controvertido. PR directo.

### Niveles puente entre capítulos
La curva del Cap 0 al Cap 1 y del Cap 1 al Cap 2 es brusca. Niveles intermedios son bienvenidos siempre que:

- Cumplan los 5 criterios de [`SECURITY.md`](SECURITY.md).
- Sigan el patrón de los 4 tiers (teoría / estrategia / esqueleto / solución).
- Mantengan la convención narrativa (Sentinel Labs, Iris, ACME, etc.).

### Niveles nuevos (cap 10 nuevo, etc.)
Por su impacto editorial, abre un issue ANTES de implementar para acordar el ángulo. Patrón:

> Quiero proponer un nivel sobre **X**. El alumno tendría rol de **<auditor/IR/...>**. El output sería **<veredicto/reporte/alerta>**. Pasa los 5 criterios de SECURITY.md así: ...

### Traducciones
La primera versión es solo en español. Si quieres traducir a EN/PT/etc., abre issue para acordar la estructura (probablemente sufijos `_en` en los campos del nivel).

## Estilo

### Código JS
- Vanilla ES6. Sin frameworks. Sin build step.
- Indentación 2 espacios.
- Sin punto y coma omitido (terminamos las sentencias con `;`).
- Strings con doble comilla por defecto.

### Contenido pedagógico
- Idioma: español neutro.
- Tono: directo, técnico, accesible. Sin "vamos a", sin "como puedes ver".
- Frases cortas. Una idea por párrafo.
- HTML con clases `kw`, `str`, `num`, `fn`, `com` para syntax highlight (ver ejemplos en `theories.js`).
- Comentarios en código que muestres: solo cuando el "por qué" no sea obvio.

### Commits
- Una unidad lógica por commit.
- Mensaje en imperativo: "añade X", "arregla Y", "limpia Z".
- Si tocas una métrica del juego (vidas, restricciones, regex de validación), explica el por qué.

## Lo que NO se acepta

- Tracking, telemetría, "phone home" de cualquier tipo.
- Dependencias `npm` o cualquier build step (mantenemos vanilla).
- Contenido que cruce la línea dura de [`SECURITY.md`](SECURITY.md), aunque sea presentado como "educativo".

## Código de conducta

Sentido común profesional. Si quieres formalizarlo, abre issue y adoptamos el [Contributor Covenant](https://www.contributor-covenant.org/).
