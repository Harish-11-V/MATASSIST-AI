import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArrowLeft, FileText, Thermometer, Shield, Zap, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function A182Demo() {
  const navigate = useNavigate();

  const grades = [
    {
      name: 'F11',
      type: 'Low Alloy Steel',
      composition: '1.25Cr-0.5Mo',
      uns: 'K11597',
      tempRange: 'Up to 593°C',
      applications: ['High temp service', 'Pressure vessels', 'Refinery equipment'],
      corrosion: 'Moderate',
      color: 'bg-orange-500'
    },
    {
      name: 'F22',
      type: 'Low Alloy Steel',
      composition: '2.25Cr-1Mo',
      uns: 'K21590',
      tempRange: 'Up to 649°C',
      applications: ['Hydrogen service', 'Hydrocracking', 'Steam piping'],
      corrosion: 'Good',
      color: 'bg-orange-600'
    },
    {
      name: 'F91',
      type: 'Modified 9Cr-1Mo',
      composition: '9Cr-1Mo-V-Nb',
      uns: 'K90901',
      tempRange: 'Up to 650°C',
      applications: ['Ultra-supercritical power', 'Steam headers', 'Superheater tubes'],
      corrosion: 'Excellent',
      color: 'bg-red-600'
    },
    {
      name: 'F6a',
      type: 'Martensitic SS',
      composition: '12% Cr',
      uns: 'S41000',
      tempRange: 'Up to 400°C',
      applications: ['Valves & pumps', 'Turbine parts', 'High-temp bolting'],
      corrosion: 'Good',
      color: 'bg-blue-500'
    },
    {
      name: 'F304',
      type: 'Austenitic SS',
      composition: '18Cr-8Ni',
      uns: 'S30400',
      tempRange: 'Cryogenic to 870°C',
      applications: ['Food processing', 'Chemical vessels', 'Pharmaceutical'],
      corrosion: 'Excellent',
      color: 'bg-green-500'
    },
    {
      name: 'F316/F316L',
      type: 'Austenitic SS',
      composition: '16Cr-10Ni-2Mo',
      uns: 'S31600/S31603',
      tempRange: 'Cryogenic to 870°C',
      applications: ['Marine hardware', 'Chemical processing', 'Acid environments'],
      corrosion: 'Excellent',
      color: 'bg-green-600'
    },
    {
      name: 'F321',
      type: 'Austenitic SS',
      composition: '18Cr-10Ni-Ti',
      uns: 'S32100',
      tempRange: '425-870°C',
      applications: ['Aircraft exhaust', 'Expansion joints', 'Heat exchangers'],
      corrosion: 'Excellent',
      color: 'bg-teal-500'
    },
    {
      name: 'F347',
      type: 'Austenitic SS',
      composition: '18Cr-11Ni-Nb',
      uns: 'S34700',
      tempRange: 'Up to 870°C',
      applications: ['High-temp chemical', 'Welded construction', 'Expansion bellows'],
      corrosion: 'Excellent',
      color: 'bg-teal-600'
    },
    {
      name: 'F51 (2205)',
      type: 'Duplex SS',
      composition: '22Cr-5Ni-3Mo-N',
      uns: 'S31803/S32205',
      tempRange: 'Ambient to 300°C',
      applications: ['Offshore platforms', 'Desalination', 'Chemical tankers'],
      corrosion: 'Excellent',
      color: 'bg-purple-500'
    },
    {
      name: 'F53 (Super Duplex)',
      type: 'Super Duplex SS',
      composition: '25Cr-7Ni-4Mo-N',
      uns: 'S32750',
      tempRange: 'Ambient to 300°C',
      applications: ['Subsea equipment', 'Deepwater oil/gas', 'High chloride'],
      corrosion: 'Exceptional',
      color: 'bg-purple-700'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        {/* Hero Section */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none">
          <CardHeader>
            <CardTitle className="text-4xl font-bold flex items-center gap-3">
              <FileText className="h-10 w-10" />
              ASTM A182/A182M Standard
            </CardTitle>
            <CardDescription className="text-blue-50 text-lg mt-2">
              Standard Specification for Forged or Rolled Alloy and Stainless Steel Pipe Flanges,
              Forged Fittings, and Valves and Parts for High-Temperature Service
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                <div className="text-3xl font-bold">10</div>
                <div className="text-sm text-blue-100">Grades Available</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                <div className="text-3xl font-bold">4</div>
                <div className="text-sm text-blue-100">Steel Categories</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                <div className="text-3xl font-bold">870°C</div>
                <div className="text-sm text-blue-100">Max Operating Temp</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                <div className="text-3xl font-bold">10,000 lb</div>
                <div className="text-sm text-blue-100">Max Weight Limit</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scope */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Scope of Standard</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              This specification covers forged low alloy and stainless steel piping components for use in 
              pressure systems. Included are flanges, fittings, valves, and similar parts to specified 
              dimensions or dimensional standards. The materials are limited to a maximum weight of 
              <strong> 10,000 lb (4540 kg)</strong> for forged products and products for other applications.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Covered Components:</h4>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Pipe flanges (NPS 1/2 to NPS 48)</li>
                  <li>• Forged fittings (elbows, tees, reducers)</li>
                  <li>• Valves and valve parts</li>
                  <li>• High-temperature service parts</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Material Categories:</h4>
                <ul className="space-y-1 text-sm text-green-800">
                  <li>• Low alloy steels (F11, F22, F91)</li>
                  <li>• Martensitic stainless steels (F6a)</li>
                  <li>• Austenitic stainless steels (F304, F316, F321, F347)</li>
                  <li>• Duplex stainless steels (F51, F53)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grades Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-yellow-500" />
              Available Grades - Quick Overview
            </CardTitle>
            <CardDescription>
              10 Representative grades covering low alloy, martensitic, austenitic, and duplex stainless steels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {grades.map((grade) => (
                <Card key={grade.name} className="border-2 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">Grade {grade.name}</CardTitle>
                      <Badge className={`${grade.color} text-white`}>
                        {grade.corrosion}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs font-mono">
                      UNS {grade.uns}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-500 uppercase mb-1">Type</div>
                      <div className="font-medium text-sm">{grade.type}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase mb-1">Composition</div>
                      <div className="font-mono text-sm">{grade.composition}</div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Thermometer className="h-4 w-4 text-red-500" />
                      <span>{grade.tempRange}</span>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase mb-1">Key Applications</div>
                      <div className="flex flex-wrap gap-1">
                        {grade.applications.map((app, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {app}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tensile Requirements Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-6 w-6 text-blue-500" />
              Mechanical Properties Requirements
            </CardTitle>
            <CardDescription>
              Minimum tensile strength, yield strength, elongation, and hardness values
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-300">
                    <th className="text-left p-3 font-semibold">Grade</th>
                    <th className="text-left p-3 font-semibold">Tensile Strength</th>
                    <th className="text-left p-3 font-semibold">Yield Strength</th>
                    <th className="text-left p-3 font-semibold">Elongation</th>
                    <th className="text-left p-3 font-semibold">Hardness</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">F11</td>
                    <td className="p-3">415 MPa min (60 ksi)</td>
                    <td className="p-3">205 MPa min (30 ksi)</td>
                    <td className="p-3">20% min</td>
                    <td className="p-3">187-248 HB</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">F22</td>
                    <td className="p-3">515 MPa min (75 ksi)</td>
                    <td className="p-3">310 MPa min (45 ksi)</td>
                    <td className="p-3">20% min</td>
                    <td className="p-3">170-217 HB max</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">F91</td>
                    <td className="p-3">585 MPa min (85 ksi)</td>
                    <td className="p-3">415 MPa min (60 ksi)</td>
                    <td className="p-3">20% min</td>
                    <td className="p-3">248 HB max</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">F6a Class 1</td>
                    <td className="p-3">485 MPa min (70 ksi)</td>
                    <td className="p-3">275 MPa min (40 ksi)</td>
                    <td className="p-3">18% min</td>
                    <td className="p-3">143-207 HB</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 bg-green-50">
                    <td className="p-3 font-medium">F304</td>
                    <td className="p-3">515 MPa min (75 ksi)</td>
                    <td className="p-3">205 MPa min (30 ksi)</td>
                    <td className="p-3">30% min</td>
                    <td className="p-3">201 HB max</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 bg-green-50">
                    <td className="p-3 font-medium">F316/F316L</td>
                    <td className="p-3">515 MPa min (75 ksi)</td>
                    <td className="p-3">205 MPa min (30 ksi)</td>
                    <td className="p-3">30% min</td>
                    <td className="p-3">217 HB max</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 bg-green-50">
                    <td className="p-3 font-medium">F321</td>
                    <td className="p-3">515 MPa min (75 ksi)</td>
                    <td className="p-3">205 MPa min (30 ksi)</td>
                    <td className="p-3">30% min</td>
                    <td className="p-3">201 HB max</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 bg-green-50">
                    <td className="p-3 font-medium">F347</td>
                    <td className="p-3">515 MPa min (75 ksi)</td>
                    <td className="p-3">205 MPa min (30 ksi)</td>
                    <td className="p-3">30% min</td>
                    <td className="p-3">201 HB max</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 bg-purple-50">
                    <td className="p-3 font-medium">F51 (2205)</td>
                    <td className="p-3">620 MPa min (90 ksi)</td>
                    <td className="p-3">450 MPa min (65 ksi)</td>
                    <td className="p-3">25% min</td>
                    <td className="p-3">290 HB max</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 bg-purple-50">
                    <td className="p-3 font-medium">F53 (Super Duplex)</td>
                    <td className="p-3">800 MPa min (116 ksi)</td>
                    <td className="p-3">550 MPa min (80 ksi)</td>
                    <td className="p-3">15% min</td>
                    <td className="p-3">310 HB max</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Heat Treatment Requirements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-6 w-6 text-red-500" />
              Heat Treatment Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50">
                <h4 className="font-semibold text-orange-900">Low Alloy Steels (F11, F22, F91)</h4>
                <p className="text-sm text-orange-800 mt-1">
                  <strong>F11, F22:</strong> Normalize at 1650-1850°F (900-1010°C), then temper at 1150-1470°F (620-800°C). Air cool.
                </p>
                <p className="text-sm text-orange-800 mt-1">
                  <strong>F91:</strong> Normalize at 1900-1975°F (1040-1080°C), then temper at 1350-1470°F (730-800°C). 
                  Post-weld heat treatment (PWHT) mandatory.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
                <h4 className="font-semibold text-blue-900">Martensitic Stainless Steels (F6a)</h4>
                <p className="text-sm text-blue-800 mt-1">
                  Anneal or normalize at 1850-1950°F (1010-1065°C). Furnace cool or air cool. 
                  May require tempering for some applications. Preheat and PWHT required for welding.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50">
                <h4 className="font-semibold text-green-900">Austenitic Stainless Steels (F304, F316, F321, F347)</h4>
                <p className="text-sm text-green-800 mt-1">
                  Solution anneal at <strong>1900-2100°F (1040-1150°C)</strong>, hold for appropriate time based on 
                  thickness, then <strong>rapid water quench</strong>. No PWHT required. F321 and F347 are stabilized 
                  grades resistant to sensitization.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50">
                <h4 className="font-semibold text-purple-900">Duplex Stainless Steels (F51, F53)</h4>
                <p className="text-sm text-purple-800 mt-1">
                  <strong>F51:</strong> Solution anneal at 1900-2010°F (1040-1100°C), water quench.
                </p>
                <p className="text-sm text-purple-800 mt-1">
                  <strong>F53:</strong> Solution anneal at 1900-2050°F (1040-1120°C), water quench. 
                  Controlled heat input essential during welding to maintain 50/50 ferrite/austenite balance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications by Category */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-green-500" />
              Typical Applications by Material Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3 text-orange-700">Low Alloy Steels</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>High-temperature pressure vessels and piping systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Refinery and petrochemical processing equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Power generation (boilers, steam systems)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Hydrogen service and hydrocracking applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>Ultra-supercritical power plants (F91)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3 text-blue-700">Martensitic Stainless</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Valve bodies, stems, and pump components</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Turbine parts requiring high strength</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>High-temperature bolting applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Moderate corrosion environments</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3 text-green-700">Austenitic Stainless</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Food processing and pharmaceutical equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Chemical processing vessels and piping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Cryogenic applications (LNG, liquid nitrogen)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Marine hardware and coastal atmospheric exposure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>High-temperature welded construction (F321, F347)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Aircraft exhaust systems and expansion joints</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3 text-purple-700">Duplex & Super Duplex</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Offshore oil and gas platforms and subsea equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Desalination plants and brackish water systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Chemical tankers and marine applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>High chloride environments (pitting resistance)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Pulp and paper digesters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Deepwater production systems (Super Duplex F53)</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Referenced Standards */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Referenced ASTM Standards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2 text-sm">
                <Badge variant="outline" className="shrink-0">A370</Badge>
                <span>Test Methods and Definitions for Mechanical Testing of Steel Products</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Badge variant="outline" className="shrink-0">A473</Badge>
                <span>Specification for Stainless Steel Forgings</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Badge variant="outline" className="shrink-0">A961/A961M</Badge>
                <span>Common Requirements for Steel Flanges, Forged Fittings, Valves, and Parts</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Badge variant="outline" className="shrink-0">A965/A965M</Badge>
                <span>Specification for Forgings, Austenitic, for Pressure and High-Temperature Parts</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Badge variant="outline" className="shrink-0">E10</Badge>
                <span>Test Method for Brinell Hardness of Metallic Materials</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Badge variant="outline" className="shrink-0">E112</Badge>
                <span>Test Methods for Determining Average Grain Size</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Badge variant="outline" className="shrink-0">E165</Badge>
                <span>Test Method for Liquid Penetrant Examination</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Badge variant="outline" className="shrink-0">E340</Badge>
                <span>Test Method for Macroetching Metals and Alloys</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold mb-3">Additional Referenced Codes & Standards:</h4>
              <div className="flex flex-wrap gap-2">
                <Badge>ASME B16.5</Badge>
                <Badge>ASME Section VIII</Badge>
                <Badge>NACE MR0175/ISO 15156</Badge>
                <Badge>API 6A</Badge>
                <Badge>DNV 2.4</Badge>
                <Badge>EN 10216-2</Badge>
                <Badge>FDA 21 CFR</Badge>
                <Badge>AMS Specifications</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Features */}
        <Card>
          <CardHeader>
            <CardTitle>Key Features of ASTM A182 Standard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Manufacturing</h4>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Forging or rolling processes</li>
                  <li>• Strict heat treatment controls</li>
                  <li>• Grain size requirements per E112</li>
                  <li>• Impact testing for low temp service</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Quality Assurance</h4>
                <ul className="space-y-1 text-sm text-green-800">
                  <li>• Chemical composition verification</li>
                  <li>• Mechanical property testing</li>
                  <li>• Hardness testing per grade</li>
                  <li>• Non-destructive examination</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Product Marking</h4>
                <ul className="space-y-1 text-sm text-purple-800">
                  <li>• Manufacturer's identification</li>
                  <li>• Grade symbol (e.g., F304H)</li>
                  <li>• Heat treatment condition</li>
                  <li>• Bar coding for traceability</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
