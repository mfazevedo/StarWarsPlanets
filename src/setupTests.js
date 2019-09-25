import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

/**
 * Configuração global do Enzyme
 * @author Michael Azevedo <michaelfernandes@id.uff.br>
 */
Enzyme.configure({adapter: new Adapter()})