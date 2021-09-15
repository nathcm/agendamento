import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";

function Desk() {
  return(
    <div id="page-desk">
      <PageHeader />

      <div id="page-content">
        <h1>Sala</h1>

        <div id="page-desk-container">
          <div id="desk-content">
            <Button type="submit" id="btn-submit">Selecionar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Desk;