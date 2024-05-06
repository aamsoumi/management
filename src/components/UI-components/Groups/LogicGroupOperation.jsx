import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

import PromptLogicGroupName from './PromptLogicGroupName.jsx';

function LogicGroupOperation({applyLogicOperation}) {
  return (
    <ButtonToolbar aria-label="Logic Operations on Groups" style={{backgroundColor: "#090a11cc"}}>
    <ButtonGroup aria-label="Logic Operations on Groups">
      <PromptLogicGroupName buttonTitle="Intersection" title="Logic Group Operations" inputPlaceholder="New Group Name" operation = "intersection" applyLogicOperation={applyLogicOperation}/>
      <PromptLogicGroupName buttonTitle="Union" title="Logic Group Operations" inputPlaceholder="New Group Name" operation = "union" applyLogicOperation={applyLogicOperation}/>
      <PromptLogicGroupName buttonTitle="Difference" title="Logic Group Operations" inputPlaceholder="New Group Name"   operation = "difference" applyLogicOperation={applyLogicOperation}/>
      <PromptLogicGroupName buttonTitle="Symmetric Difference" title="Logic Group Operations" inputPlaceholder="New Group Name"  operation = "symmetricDifference" applyLogicOperation={applyLogicOperation}/>
    </ButtonGroup>
    </ButtonToolbar>
  );
}

export default LogicGroupOperation;