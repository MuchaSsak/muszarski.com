/**
 * The hobby prints on My life (`LifePrints.astro`) [user 2026-10-07: "display all my hobbies in a stunning, visually
 * impressive way", "experiment with shaders"; the toys before them felt "messy/overwhelming"]: one WebGL canvas prints
 * the picked hobby as a live two-ink riso print. Every scene is a small picture in signed distances that returns how
 * much of each ink a spot takes; two dot screens (15° and 75°, the second a hair off register, like a real riso) turn
 * that into dots. A new pick wipes across the print dot by dot: the old dots shrink to nothing, the paper flips, the
 * new dots grow. The pointer is a loupe. Paused or reduced motion: one still frame per print, swapped at once.
 *
 * Scenes, in the order of the list: 0 rings, 1 record, 2 light and a cross, 3 sun over the sea, 4 road, 5 Pong,
 * 6 film countdown, 7 mirror ball, 8 aperture, 9 a stair that grows by a step for ever.
 */
import { runShader } from "~/scripts/life-gl";
import { motionStill } from "~/scripts/motion";

const FRAG = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 u_res;uniform float u_time;uniform vec2 u_mouse;uniform float u_cell;
uniform float u_a;uniform float u_b;uniform float u_mix;
uniform vec3 u_pa;uniform vec3 u_1a;uniform vec3 u_2a;uniform vec3 u_pb;uniform vec3 u_1b;uniform vec3 u_2b;
#define PI 3.14159265
float ASP;float AA;
float h21(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,s,-s,c);}
float tri(float x){return abs(fract(x)*2.-1.);}
float fill(float d,float k){k=max(k,AA);return 1.-smoothstep(-k,k,d);}
float box(vec2 p,vec2 b){vec2 q=abs(p)-b;return length(max(q,0.))+min(max(q.x,q.y),0.);}
float seg(vec2 p,vec2 a,vec2 b){vec2 pa=p-a,ba=b-a;return length(pa-ba*clamp(dot(pa,ba)/dot(ba,ba),0.,1.));}

vec2 rings(vec2 p,float t){
float sw=.09*sin(t*1.1);
float i1=0.,i2=.8*smoothstep(.42,0.,length(p-vec2(0.,-.08)));
for(int i=0;i<2;i++){
float side=float(i)*2.-1.;
vec2 piv=vec2(side*.16,.66);float a=sw+side*.015;
vec2 dir=vec2(sin(a),-cos(a));vec2 c=piv+dir*.8;
i1=max(i1,fill(seg(p,piv,c-dir*.11)-.012,.003));
i1=max(i1,fill(box(rot(-a)*(p-(c-dir*.115)),vec2(.032,.018)),.003));
vec2 q=p-c;
i1=max(i1,fill(abs(length(q)-.098)-.026,.003)*(.7+.3*sin(atan(q.y,q.x)+2.2)));}
i1=max(i1,.45*smoothstep(1.,0.,length((p-vec2(sw*.8,-.43))*vec2(2.6,14.))));
return vec2(i1,i2);}

vec2 vinyl(vec2 p,float t){
vec2 q=p-vec2(-.07,-.05);float r=length(q),a=atan(q.y,q.x);
float i1=fill(r-.41,.003)*(.84+.16*sin(r*130.))*(1.-.75*smoothstep(.01,0.,abs(r-.29)))*(1.-.45*pow(abs(cos(a-.75)),14.));
float label=fill(r-.135,.003);
float i2=label*(.5+.5*step(0.,sin(a+t*1.6)))*(1.-fill(r-.014,.002));
i1*=1.-label;
vec2 piv=vec2(.33,.39),elbow=vec2(.3+.006*sin(t*2.),.05),head=vec2(.19,-.04);
float arm=min(min(seg(p,piv,elbow),seg(p,elbow,head))-.013,length(p-piv)-.05);
arm=min(arm,box(rot(.6)*(p-head),vec2(.045,.026)));
float m=fill(arm,.003);
i1*=1.-fill(arm-.014,.003);
return vec2(i1,max(i2*(1.-m),m));}

vec2 light(vec2 p,float t){
vec2 q=p-vec2(0.,.72);float a=atan(q.x,-q.y);
float rays=(.5+.5*sin(a*23.+sin(t*.3)*1.5))*(.55+.45*sin(a*7.-t*.21));
float i1=rays*smoothstep(1.1,.25,abs(a))*smoothstep(1.45,.2,length(q))*.8;
vec2 c=p-vec2(0.,-.04);
float cr=min(box(c,vec2(.03,.31)),box(c-vec2(0.,.12),vec2(.2,.03)));
float i2=max(fill(cr,.003),.8*exp(-max(cr,0.)*(8.-1.5*sin(t*.8))));
i1*=1.-fill(cr-.015,.003);
return vec2(i1,i2);}

vec2 sea(vec2 p,float t){
float hz=-.05;vec2 sc=vec2(.09,.05);float i1=0.,i2=0.;
if(p.y>hz){
i2=max(fill(length(p-sc)-.2,.003),.38*smoothstep(.42,hz,p.y));
vec2 ac=vec2(-.1,-.62);
float s=atan(p.y-ac.y,p.x-ac.x)*.93+t*.03;
i1=fill(length(vec2(mod(s,.05)-.025,length(p-ac)-.93))-.011,0.);
}else{
float d=hz-p.y;float z=.06/(d+.015);
float w=sin(z*8.+sin(p.x*6.+t*.5+z*.7)*1.3-t*1.2);
i1=mix(.3,.95,smoothstep(0.,.4,d))*(.75+.25*w);
i2=smoothstep(.17+d*.3,0.,abs(p.x-sc.x))*step(.25,w)*smoothstep(.42,.02,d);
i1*=1.-i2;}
return vec2(i1,i2);}

vec2 road(vec2 p,float t){
float hz=.08;float i1=0.,i2=0.;
if(p.y<hz){
float d=hz-p.y;float rx=p.x/d,z=1./d;
float on=fill(abs(p.x)-1.05*d,0.);float run=fract(z*.5+t*1.7);
i1=on*(.8+.12*step(.5,fract(z*.25+t*.85)));
i2=max(fill(abs(p.x)-.05*d,0.)*step(.5,run),fill(abs(abs(p.x)-.92*d)-.045*d,0.))*on*smoothstep(.015,.09,d);
i1*=1.-i2;
i1=max(i1,(1.-on)*.3*step(.6,run));
}else{
float s=p.y-hz;
i2=fill(length(p-vec2(0.,hz))-.27,.003)*(1.-step(fract(s*13.-t*.3),.45-s*2.2));
i1=fill(p.y-hz-.045-.035*sin(p.x*8.+1.)-.02*sin(p.x*21.),0.)*.85;
i2*=1.-i1;}
return vec2(i1,i2);}

float bit(float m,float d){return mod(floor(m/d+.001),2.);}
float digit(vec2 p,float n){
float m=n<.5?63.:n<1.5?6.:n<2.5?91.:n<3.5?79.:n<4.5?102.:n<5.5?109.:n<6.5?125.:n<7.5?7.:n<8.5?127.:111.;
vec2 h=vec2(.085,.024),v=vec2(.024,.085);float d=9.;
if(bit(m,1.)>.5)d=min(d,box(p-vec2(0.,.17),h));
if(bit(m,2.)>.5)d=min(d,box(p-vec2(.085,.085),v));
if(bit(m,4.)>.5)d=min(d,box(p-vec2(.085,-.085),v));
if(bit(m,8.)>.5)d=min(d,box(p-vec2(0.,-.17),h));
if(bit(m,16.)>.5)d=min(d,box(p-vec2(-.085,-.085),v));
if(bit(m,32.)>.5)d=min(d,box(p-vec2(-.085,.085),v));
if(bit(m,64.)>.5)d=min(d,box(p,h));
return d;}
vec2 ballAt(float k,vec2 r){return vec2(tri(k*.9)*2.-1.,tri(k*.63+.3)*2.-1.)*r;}
vec2 pong(vec2 p,float t){
vec2 hs=vec2(min(.38,ASP*.5-.06),.24);
vec2 sc=p-vec2(0.,.17);
float scr=box(sc,hs-.04)-.04;
float inScr=fill(scr,0.);
vec2 g=(floor(sc*34.)+.5)/34.;
float k=t*.5;vec2 r=hs-vec2(.09,.05);
float game=max(fill(box(g-vec2(-hs.x+.05,ballAt(k-.1,r).y),vec2(.012,.055)),0.),fill(box(g-vec2(hs.x-.05,ballAt(k-.05,r).y),vec2(.012,.055)),0.));
game=max(game,step(abs(g.x),.012)*step(.5,fract(g.y*9.)));
vec2 dq=(sc-vec2(0.,hs.y-.09))*2.6;
game=max(game,max(fill(digit(dq+vec2(.28,0.),2.),0.),fill(digit(dq-vec2(.28,0.),3.),0.)));
float ball=0.;
for(int i=0;i<4;i++){float f=float(i);ball=max(ball,fill(box(g-ballAt(k-f*.025,r),vec2(.016)),0.)*(1.-f*.24));}
float i1=inScr*(1.-game)*(1.-ball)*.93;
float i2=inScr*ball;
i1=max(i1,fill(abs(scr-.012)-.008,0.));
for(int j=0;j<2;j++){
float side=float(j)*2.-1.;
vec2 c=rot(side*.14+.06*sin(t*3.1+side*1.7))*(p-vec2(side*.19,-.31));
float body=box(c,vec2(.1,.036))-.042;
float pad=min(box(c-vec2(-.065,0.),vec2(.03,.01)),box(c-vec2(-.065,0.),vec2(.01,.03)));
float btn=min(length(c-vec2(.055,.016))-.016,length(c-vec2(.088,-.012))-.016);
i1=max(i1,fill(body,0.)*(1.-fill(pad,0.))*(1.-fill(btn,0.)));
i2=max(i2,fill(btn,0.));
i1=max(i1,fill(seg(p,vec2(side*.19,-.24),vec2(side*.07,-.08))-.006,0.)*(1.-inScr));}
return vec2(i1,i2);}

vec2 film(vec2 p,float t){
float cyc=t*.7;float r=length(p);float a=mod(atan(p.x,p.y)+2.*PI,2.*PI);
float i1=.24*smoothstep(.58,0.,r)*(.8+.2*h21(vec2(floor(t*11.),1.7)));
float i2=.6*step(a,fract(cyc)*2.*PI)*step(r,.315);
float marks=min(min(abs(r-.33),abs(r-.395))-.011,min(box(p,vec2(.47,.008)),box(p,vec2(.008,.47))));
float dg=digit(p,8.-mod(floor(cyc),6.));
i1=max(i1,fill(min(marks,dg),.003));
i2*=1.-fill(dg-.02,.003);
float edge=ASP*.5-.075;float strip=step(edge,abs(p.x));
float hole=fill(box(vec2(abs(p.x)-edge-.035,mod(p.y-t*.22,.11)-.055),vec2(.016,.026)),.003);
i1=max(i1*(1.-strip),strip*.75*(1.-hole));i2*=1.-strip;
i1=max(i1,step(.965,h21(floor(p*64.)+floor(t*9.)))*.9);
return vec2(i1,i2);}

vec2 disco(vec2 p,float t){
vec2 q=rot(t*.12)*p*3.2;vec2 id=floor(q);float h=h21(id);
float spot=fill(length(fract(q)-.5-(vec2(h21(id+3.1),h)-.5)*.35)*.3125-.035-.025*h,0.);
float i1=spot*step(.5,h)*.85,i2=spot*step(h,.2);
i1=max(i1,fill(box(p-vec2(0.,.43),vec2(.008,.09)),.002));
vec2 b=(p-vec2(0.,.1))/.25;float rr=dot(b,b);
float ball=fill(sqrt(rr)*.25-.25,0.);
if(ball>0.){
vec3 n=vec3(b,sqrt(max(0.,1.-rr)));
vec2 f=vec2((atan(n.x,n.z)+t*.4)*10./PI,asin(clamp(n.y,-1.,1.))*7./PI);
vec2 e=abs(fract(f)-.5);float seam=smoothstep(.36,.47,max(e.x,e.y));
float lit=clamp(dot(n,normalize(vec3(-.5,.55,.65))),0.,1.);
float glint=step(.8,h21(floor(f)))*lit;
i1=mix(i1,(.25+.65*lit)*(1.-seam)*(1.-glint),ball);i2=mix(i2,glint*(1.-seam),ball);}
return vec2(i1,i2);}

vec2 iris(vec2 p,float t){
float bok=0.;
for(int i=0;i<7;i++){float k=float(i);
vec2 c=vec2(sin(k*2.4+t*.13)*.42,cos(k*1.9+t*.1)*.44);
bok=max(bok,fill(length(p-c)-.05-.05*fract(k*.37),.008)*(.35+.3*fract(k*.61)));}
vec2 q=p-vec2(0.,.02);float r=length(q),a=atan(q.y,q.x);
float open=.1+.085*(.5+.5*sin(t*.75));float spin=open*2.4;float sector=2.*PI/7.;
float blades=step(0.,r*cos(mod(a-spin,sector)-sector*.5)-open)*step(r,.33);
float s=(a-spin+r*2.8)/sector;
float i1=blades*(.62+.3*h21(vec2(mod(floor(s),7.),4.)))*(1.-.75*smoothstep(.08,0.,fract(s)));
float barrel=step(.33,r)*step(r,.405);
i1=max(i1,barrel*(.5+.4*smoothstep(-.4,.4,sin(a*40.))));
return vec2(i1,bok*(1.-blades)*(1.-barrel));}

vec2 steps(vec2 p,float t){
float g=1.3;
vec2 w=(p-vec2(-ASP*.5-.03,-.53))*pow(g,fract(t*.16));
float i=floor(log(max(w.x,1e-4)/.1)/log(g));
float gi=pow(g,i);float top=.08*gi*g;
float inside=max(fill(w.y-top,0.),fill(.1*gi*g-w.x,0.)*fill(w.y-top*g,0.));
float tread=fill(w.y-top,0.)*(1.-fill(w.y-top+.025*gi,0.));
float i1=inside*(.68+.22*mod(i,2.))*(1.-tread);
float i2=max(tread,.55*smoothstep(.46,0.,length(p-vec2(-ASP*.22,.36)))*(1.-inside));
return vec2(i1,i2);}

vec2 pick(float s,vec2 p,float t){
if(s<.5)return rings(p,t);if(s<1.5)return vinyl(p,t);if(s<2.5)return light(p,t);if(s<3.5)return sea(p,t);
if(s<4.5)return road(p,t);if(s<5.5)return pong(p,t);if(s<6.5)return film(p,t);if(s<7.5)return disco(p,t);
if(s<8.5)return iris(p,t);return steps(p,t);}
float wipe(vec2 px,float jit){
vec2 uv=px/u_res;
float k=(uv.x*.55+(1.-uv.y)*.45)*(1.-jit)+jit;
return smoothstep(k*.6,k*.6+.4,u_mix);}
vec2 screen(vec2 f,float ang,float ink){
vec2 q=rot(ang)*f/u_cell;vec2 id=floor(q)+.5;
vec2 ctr=rot(-ang)*id*u_cell;
float m=wipe(ctr,h21(id+ang)*.12);float b=step(.5,m);
vec2 cov=pick(b>.5?u_b:u_a,(ctr-.5*u_res)/u_res.y,u_time);
float c=(ink<.5?cov.x:cov.y)*abs(2.*m-1.);
float r=sqrt(clamp(c,0.,1.))*.76;
return vec2(clamp((r-length(q-id))*u_cell*.9+.5,0.,1.)*smoothstep(0.,.03,c),b);}
void main(){
ASP=u_res.x/u_res.y;AA=.75*u_cell/u_res.y;
vec2 f=gl_FragCoord.xy;vec2 m=u_mouse*u_res;float R=.22*u_res.y;
f=m+(f-m)*(1.-.4*exp(-dot(f-m,f-m)/(R*R)));
vec2 s1=screen(f,.26,0.);
vec2 s2=screen(f+vec2(1.2,-.9)*u_cell*.22,1.31,1.);
vec3 c=mix(u_pa,u_pb,step(.5,wipe(gl_FragCoord.xy,0.)));
c=mix(c,mix(u_2a,u_2b,s2.y),s2.x);
c=mix(c,mix(u_1a,u_1b,s1.y),s1.x*.96);
c+=(h21(gl_FragCoord.xy+fract(u_time))-.5)*.03;
gl_FragColor=vec4(c,1.);}`;

export interface PrintInks {
  paper: string;
  ink1: string;
  ink2: string;
}

const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as [number, number, number];
const ease = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
/** One wipe; a pick that lands mid-wipe waits for it and then runs. */
const WIPE_MS = 760;

export function startPrints(canvas: HTMLCanvasElement, host: HTMLElement, inks: PrintInks[], first: number) {
  const colours = inks.map((ink) => ({ paper: rgb(ink.paper), ink1: rgb(ink.ink1), ink2: rgb(ink.ink2) }));
  const start = performance.now();
  let from = first;
  let to = first;
  let queued = -1;
  let since = 0;
  const shader = runShader(canvas, FRAG, {
    pointer: host,
    // The loupe rests below the print, out of sight.
    rest: [0.5, -0.8],
    dpr: 2,
    frame(set, now) {
      let mix = 1;
      if (from !== to) {
        const k = motionStill() ? 1 : Math.min(1, (now - since) / WIPE_MS);
        mix = ease(k);
        if (k >= 1) {
          from = to;
          if (queued >= 0 && queued !== to) {
            to = queued;
            since = now;
            mix = 0;
          }
          queued = -1;
        }
      }
      const a = colours[from]!;
      const b = colours[to]!;
      set("u_a", from);
      set("u_b", to);
      set("u_mix", from === to ? 1 : mix);
      set("u_pa", ...a.paper);
      set("u_1a", ...a.ink1);
      set("u_2a", ...a.ink2);
      set("u_pb", ...b.paper);
      set("u_1b", ...b.ink1);
      set("u_2b", ...b.ink2);
      // Dots about 1/84 of the print, 5-9 CSS px: crisp on phones, still a print on a big screen.
      const ratio = canvas.width / Math.max(1, canvas.clientWidth);
      set("u_cell", Math.min(9, Math.max(5, canvas.clientWidth / 84)) * ratio);
      // Paused: one still frame, at a moment where every scene reads well.
      set("u_time", motionStill() ? 2.4 : ((now - start) / 1000) % 3600);
    },
  });
  if (!shader) return null;
  return {
    show(index: number) {
      if (from === to) {
        if (index === to) return;
        to = index;
        since = performance.now();
      } else queued = index === to ? -1 : index;
      shader.kick();
    },
  };
}
