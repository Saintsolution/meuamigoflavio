import React, { useState } from 'react';
import { Upload, Calendar, Briefcase, Copy, Check, Info } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  height: string;
  scenario: string;
  image: File | null;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    height: '',
    scenario: '',
    image: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const scenarios = [
    { id: 'encontro-casual.webp', label: 'Opção 1: Encontro Casual', image: '/encontro-casual.webp' },
    { id: 'encontro-oficial.webp', label: 'Opção 2: Compromisso Oficial', image: '/encontro-oficial.webp' },
    { id: 'encontro-patriota.webp', label: 'Opção 3: Apoio Patriota', image: '/encontro-patriota.webp' }
  ];

  const pixEmail = "contato@saintsolution.com.br";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const WEBHOOK_URL = 'https://n8n.saintsolution.com.br/webhook/ab40ce52-2fdf-413f-8a30-8fe6125290d0';

    try {
      if (!formData.image) {
        setSubmitMessage('Por favor, envie uma imagem.');
        setIsSubmitting(false);
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(formData.image);
      reader.onload = async () => {
        const base64Image = (reader.result as string).split(',')[1];
        
        const payload = {
          name: formData.name,
          email: formData.email,
          height: formData.height,
          scenario: formData.scenario,
          image: base64Image,
          fileName: formData.image?.name
        };

        const response = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          setSubmitMessage('Imagem enviada com sucesso! Verifique seu e-mail em breve.');
          setFormData({ name: '', email: '', height: '', scenario: '', image: null });
        } else {
          setSubmitMessage('Erro no envio. Tente novamente.');
        }
        setIsSubmitting(false);
      };
    } catch (error) {
      setSubmitMessage('Erro ao processar a solicitação.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <header className="bg-[#006400] shadow-2xl py-14 border-b-8 border-[#FFD700]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white font-light tracking-[0.4em] uppercase text-[10px] sm:text-xs mb-4 opacity-80 text-center">Gerador de Fotos</p>
          <h1 className="text-5xl sm:text-8xl font-black text-[#FFD700] tracking-tighter italic leading-none drop-shadow-lg text-center">MEU AMIGO FLÁVIO</h1>
          <p className="mt-8 text-lg sm:text-2xl font-light text-white/90 max-w-2xl mx-auto border-t border-white/20 pt-6 text-center">Um legado de cidadania ao Brasil</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Seção de Trajetória */}
        <section className="mb-28">
          <h2 className="text-3xl font-bold text-center mb-16 text-[#003366] uppercase tracking-widest">Trajetória do Cidadão</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-slate-50 rounded-[2rem] p-10 border-t-4 border-[#006400] shadow-sm">
              <div className="flex items-center mb-6 text-[#003366]">
                <Calendar className="w-10 h-10 mr-4 text-[#006400]" />
                <h3 className="text-2xl font-black">Atuação Legislativa</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">Décadas de dedicação ao Rio de Janeiro, com foco firme em segurança pública.</p>
            </div>
            <div className="bg-slate-50 rounded-[2rem] p-10 border-t-4 border-[#FFD700] shadow-sm">
              <div className="flex items-center mb-6 text-[#003366]">
                <Briefcase className="w-10 h-10 mr-4 text-[#FFD700]" />
                <h3 className="text-2xl font-black">Compromisso Nacional</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">Representação ativa no cenário nacional, buscando o desenvolvimento econômico.</p>
            </div>
          </div>
        </section>

        {/* Formulário principal */}
        <section className="bg-slate-50 rounded-[4rem] p-8 lg:p-20 shadow-inner border border-gray-100">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-[#003366] mb-8">Participe da Trend</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">Envie uma foto sua de cintura para cima e crie uma montagem especial!</p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="space-y-12">
              <div>
                <p className="text-[#003366] font-black uppercase tracking-widest text-sm text-center mb-8">1. Escolha um Cenário</p>
                <div className="grid sm:grid-cols-3 gap-8">
                  {scenarios.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => setFormData(p => ({ ...p, scenario: s.id }))}
                      className={`group cursor-pointer rounded-[2rem] overflow-hidden border-4 transition-all ${
                        formData.scenario === s.id ? 'border-[#006400] scale-105 shadow-2xl' : 'border-transparent bg-white'
                      }`}
                    >
                      <img src={s.image} alt={s.label} className="w-full h-48 object-cover" />
                      <div className="p-4 text-center">
                        <p className={`text-xs font-bold uppercase ${formData.scenario === s.id ? 'text-[#006400]' : 'text-[#003366]'}`}>{s.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <input type="email" name="email" placeholder="Seu E-mail" value={formData.email} onChange={handleInputChange} required className="w-full px-8 py-5 rounded-2xl border-2 border-gray-100 outline-none bg-white shadow-sm" />
                <input type="number" name="height" placeholder="Sua Altura (cm)" value={formData.height} onChange={handleInputChange} required className="w-full px-8 py-5 rounded-2xl border-2 border-gray-100 outline-none bg-white shadow-sm" />
              </div>

              <div className="flex flex-col gap-8">
                <label className="cursor-pointer group">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-[2rem] group-hover:border-[#006400] bg-white">
                    <Upload className="w-10 h-10 mb-4 text-gray-300 group-hover:text-[#006400]" />
                    <span className="text-gray-500 font-bold uppercase text-xs">{formData.image ? formData.image.name : 'Selecione sua foto'}</span>
                  </div>
                </label>
                <button type="submit" disabled={isSubmitting || !formData.scenario || !formData.image} className="w-full bg-[#006400] text-[#FFD700] font-black py-7 rounded-[2rem] shadow-2xl disabled:opacity-30 text-2xl uppercase tracking-[0.2em]">
                  {isSubmitting ? 'Gerando sua foto...' : 'Gerar Minha Foto'}
                </button>
              </div>
            </div>
            {/* Mensagem de sucesso restaurada */}
            {submitMessage && (
              <div className="mt-10 p-6 rounded-2xl bg-[#003366] text-white text-center font-bold text-lg animate-pulse">
                {submitMessage}
              </div>
            )}
          </form>
        </section>
      </main>

      {/* Footer Corrigido: Lado a Lado e Menor */}
      <footer className="bg-[#0b1221] text-white pt-16 pb-12 border-t-8 border-[#FFD700]">
  <div className="max-w-4xl mx-auto px-4">
    <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
      
      {/* Lado Esquerdo: Pix e Texto - Mais compacto */}
      <div className="flex-1 max-w-sm">
        <h4 className="text-3xl font-black mb-2 text-[#FFD700] italic uppercase tracking-tighter">Apoie este Espaço</h4>
        <p className="text-gray-400 mb-6 text-xs leading-relaxed">
          Sua contribuição ajuda a manter os custos de processamento de imagem por IA.
        </p>
        
        <div className="space-y-3">
          {/* Campo de e-mail mais fino */}
          <div className="bg-[#1a2333] border border-white/10 rounded-lg p-3">
            <p className="text-yellow-400 font-mono text-sm break-all">{pixEmail}</p>
          </div>
          
          {/* Botão com bitola menor (py-3 em vez de py-5) */}
          <button 
            onClick={copyToClipboard} 
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#FFD700] text-slate-900 font-black rounded-lg uppercase text-[10px] tracking-widest shadow-xl hover:bg-[#ffeb3b] transition-all"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Chave PIX'}
          </button>
        </div>
      </div>

      {/* Lado Direito: QR Code maior e com moldura fina */}
      <div className="flex flex-col items-center">
        <div className="bg-white p-2 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)]">
          {/* QR Code aumentado para w-60 (240px) */}
          <img src="/qrcode.png" alt="QR Code PIX" className="w-60 h-60 object-contain" />
        </div>
        <p className="text-[9px] text-gray-500 mt-3 uppercase tracking-[0.2em] font-bold">Escaneie para apoiar</p>
      </div>
    </div>

    {/* Disclaimer Legal - Bem discreto embaixo */}
    <div className="mt-16 pt-8 border-t border-white/5 text-center">
       <div className="flex items-center justify-center gap-2 text-gray-700 mb-2">
         <Info className="w-3 h-3" />
         <span className="text-[8px] uppercase tracking-widest font-bold">Disclaimer Legal</span>
       </div>
       <p className="text-[8px] text-gray-700 max-w-3xl mx-auto leading-relaxed uppercase tracking-tight">
         Uso pessoal e de entretenimento. Sem valor oficial ou propaganda política. O usuário é o único responsável pelo uso das imagens geradas.
       </p>
    </div>
  </div>
</footer>
    </div>
  );
}

export default App;