import { useState } from 'react';
import { Upload, Calendar, Briefcase, Copy, Check } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    height: '',
    scenario: '',
    image: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [copied, setCopied] = useState(false);

  // Configuração dos Temas
  const scenarios = [
    { id: 'casual', label: 'Opção 1: Encontro Casual', image: '/encontro casual.webp' },
    { id: 'official', label: 'Opção 2: Compromisso Oficial', image: '/encontro oficial.webp' },
    { id: 'patriot', label: 'Opção 3: Apoio Patriota', image: '/encontro patriota.webp' }
  ];

  // Dados para o Apoio (PIX)
  const pixKey = "49e7d2ac-9d45-49b9-ad24-d39d0e881aa1";
  const pixEmail = "contato@saintsolution.com.br";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixKey);
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

    // COLOQUE SUA URL DO N8N AQUI
    const WEBHOOK_URL = 'SUA_URL_DO_N8N_AQUI';

    try {
      if (!formData.image) {
        setSubmitMessage('Por favor, envie uma imagem.');
        setIsSubmitting(false);
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(formData.image);
      reader.onload = async () => {
        const base64Image = reader.result as string;
        
        const payload = {
          name: formData.name,
          email: formData.email,
          height: formData.height,
          scenario: formData.scenario,
          image: base64Image
        };

        const response = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          setSubmitMessage('Sucesso! Verifique seu e-mail em breve para receber sua foto.');
          setFormData({ name: '', email: '', height: '', scenario: '', image: null });
        } else {
          setSubmitMessage('Erro no envio. Tente novamente mais tarde.');
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
      {/* HEADER ESTILIZADO */}
      <header className="bg-[#006400] shadow-2xl py-14 border-b-8 border-[#FFD700]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white font-light tracking-[0.4em] uppercase text-[10px] sm:text-xs mb-4 opacity-80">
            Gerador de Fotos
          </p>
          <h1 className="text-5xl sm:text-8xl font-black text-[#FFD700] tracking-tighter italic leading-none drop-shadow-lg">
            MEU AMIGO FLÁVIO
          </h1>
          <p className="mt-8 text-lg sm:text-2xl font-light text-white/90 max-w-2xl mx-auto border-t border-white/20 pt-6">
            Um legado de cidadania ao Brasil
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* SEÇÃO BIOGRÁFICA (CIDADÃO) */}
        <section className="mb-28">
          <h2 className="text-3xl font-bold text-center mb-16 text-[#003366] uppercase tracking-widest">Trajetória do Cidadão</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-slate-50 rounded-[2rem] p-10 border-t-4 border-[#006400] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6 text-[#003366]">
                <Calendar className="w-10 h-10 mr-4 text-[#006400]" />
                <h3 className="text-2xl font-black">Atuação Legislativa</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Décadas de dedicação ao Rio de Janeiro, com foco firme em segurança pública e na defesa dos valores da família brasileira.
              </p>
            </div>
            <div className="bg-slate-50 rounded-[2rem] p-10 border-t-4 border-[#FFD700] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6 text-[#003366]">
                <Briefcase className="w-10 h-10 mr-4 text-[#FFD700]" />
                <h3 className="text-2xl font-black">Compromisso Nacional</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Representação ativa no cenário nacional, buscando o desenvolvimento econômico e a integridade das instituições do país.
              </p>
            </div>
          </div>
        </section>

        {/* ÁREA DO GERADOR */}
        <section className="bg-slate-50 rounded-[4rem] p-8 lg:p-20 shadow-inner border border-gray-100">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-[#003366] mb-8">Participe da Trend</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
              Envie uma foto sua de cintura para cima e crie uma montagem especial ao lado do Senador Flávio Bolsonaro!
            </p>
            <p className="mt-4 text-gray-500 italic">Siga o exemplo abaixo para o enquadramento perfeito.</p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            
            {/* REFERÊNCIA DE ENQUADRAMENTO */}
            <div className="mb-20 text-center">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] block mb-6">Figura de Referência</span>
              <div className="inline-block p-4 bg-white rounded-[2rem] shadow-2xl border border-gray-200">
                <img 
                  src="/referencia.webp" 
                  alt="Referência" 
                  className="w-64 h-auto rounded-2xl grayscale opacity-70"
                />
                <div className="mt-4 py-1 px-4 bg-slate-100 rounded-full inline-block">
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Cintura para cima</p>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              {/* 1. SELEÇÃO DE TEMA */}
              <div>
                <p className="text-[#003366] font-black uppercase tracking-widest text-sm text-center mb-8">1. Escolha um Cenário</p>
                <div className="grid sm:grid-cols-3 gap-8">
                  {scenarios.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => setFormData(p => ({ ...p, scenario: s.id }))}
                      className={`group cursor-pointer rounded-[2rem] overflow-hidden border-4 transition-all duration-500 ${
                        formData.scenario === s.id 
                        ? 'border-[#006400] scale-105 shadow-2xl' 
                        : 'border-transparent hover:border-gray-300 bg-white'
                      }`}
                    >
                      <img src={s.image} alt={s.label} className="w-full h-48 object-cover" />
                      <div className="p-4 text-center">
                        <p className={`text-xs font-bold uppercase tracking-tighter ${formData.scenario === s.id ? 'text-[#006400]' : 'text-[#003366]'}`}>
                          {s.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. DADOS TÉCNICOS */}
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#003366] uppercase ml-4">Seu E-mail</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Para onde enviamos a foto?"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-8 py-5 rounded-2xl border-2 border-gray-100 focus:border-[#006400] focus:bg-white bg-white/50 outline-none transition-all text-gray-700 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#003366] uppercase ml-4">Sua Altura (cm)</label>
                  <input
                    type="number"
                    name="height"
                    placeholder="Ex: 175"
                    value={formData.height}
                    onChange={handleInputChange}
                    required
                    className="w-full px-8 py-5 rounded-2xl border-2 border-gray-100 focus:border-[#006400] focus:bg-white bg-white/50 outline-none transition-all text-gray-700 shadow-sm"
                  />
                </div>
              </div>

              {/* 3. UPLOAD E BOTÃO */}
              <div className="flex flex-col gap-8">
                <label className="cursor-pointer group">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-[2rem] group-hover:border-[#006400] group-hover:bg-green-50 transition-all bg-white">
                    <Upload className="w-10 h-10 mb-4 text-gray-300 group-hover:text-[#006400] transition-colors" />
                    <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">
                      {formData.image ? formData.image.name : 'Selecione sua foto'}
                    </span>
                  </div>
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.scenario || !formData.image}
                  className="w-full bg-[#006400] hover:bg-[#004d00] text-[#FFD700] font-black py-7 rounded-[2rem] shadow-2xl transition-all disabled:opacity-30 text-2xl uppercase tracking-[0.2em]"
                >
                  {isSubmitting ? 'Gerando sua foto...' : 'Gerar Minha Foto'}
                </button>
              </div>
            </div>

            {submitMessage && (
              <div className="mt-10 p-6 rounded-2xl bg-[#003366] text-white text-center font-bold text-lg animate-pulse">
                {submitMessage}
              </div>
            )}
          </form>
        </section>
      </main>

      {/* FOOTER COM PIX E DISCLAIMER */}
      <footer className="bg-slate-900 text-white pt-24 pb-12 border-t-8 border-[#FFD700]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-start mb-20">
            <div className="text-center lg:text-left">
              <h4 className="text-4xl font-black mb-8 text-[#FFD700] italic">Apoie este Espaço</h4>
              <p className="text-gray-400 mb-10 leading-relaxed text-xl font-light">
                Manter servidores de IA ativos tem um custo elevado. Sua contribuição ajuda a manter este legado vivo e acessível para todos os amigos do Brasil.
              </p>
              
              <div className="space-y-6 max-w-md mx-auto lg:mx-0">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">Chave PIX Oficial</p>
                  <p className="text-yellow-400 font-mono text-lg break-all">{pixEmail}</p>
                </div>
                
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center justify-center gap-3 w-full py-5 bg-[#FFD700] hover:bg-yellow-500 text-slate-900 font-black rounded-2xl transition-all uppercase tracking-widest text-sm shadow-xl"
                >
                  {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                  {copied ? 'Copiado!' : 'Copiar Chave PIX'}
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-end">
              <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_0_50px_rgba(255,215,0,0.2)]">
                <img src="/qrcode.png" alt="QR Code PIX" className="w-56 h-56 object-contain" />
              </div>
              <p className="mt-6 text-[10px] text-gray-500 font-black uppercase tracking-[0.4em]">Aponte a câmera para contribuir</p>
            </div>
          </div>

          <div className="border-t border-white/5 pt-12">
            <p className="text-[10px] text-gray-500 leading-relaxed text-center italic max-w-4xl mx-auto opacity-60">
              <strong>DISCLAIMER:</strong> Este site é uma plataforma de tecnologia voltada para entretenimento e expressão de fãs. 
              Não possuímos vínculo com campanhas oficiais, partidos políticos ou coligações. 
              O uso das imagens é de responsabilidade exclusiva do usuário. Respeite as leis eleitorais vigentes.
            </p>
            <div className="text-center mt-10 text-[10px] text-gray-600 uppercase tracking-[0.5em] font-bold">
              © 2026 Meu Amigo Flávio | Saintsolution.com.br
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;