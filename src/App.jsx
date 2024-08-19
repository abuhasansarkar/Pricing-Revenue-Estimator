
import './App.css'
import PricingCalculator from './components/PricingCalculator'

function App() {

  return (
    <main>
      <div className='heading'>
           <h1>Pricing Calculator</h1>
      <i>Estimate the price of your course based on competitor analysis.</i>
      </div>
   
      <PricingCalculator/>
    </main>
  )
}

export default App
