import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default function InfoModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Van Mama Voor Tess
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Lieve allemaal, welkom op de herinneringswebsite van Jacqueline. </h4>
            <p>
                Via deze website willen wij een plek creëren waar Tess meer te weten kan komen over haar moeder. Degene die dat het beste kunnen vertellen zijn de vrienden en familie van Jacqueline. 
                Je kunt hier je herinnering plaatsen (via computer of telefoon) in de vorm van een verhaaltje, een foto, een filmpje of een combinatie hiervan. <strong>Het maximale formaat mag max 100 Mb zijn.</strong>
            </p>    
            <p>
                <strong>Belangrijk is dat we een positieve toon willen houden op de website, houdt daar rekening mee!</strong> Denk aan vakanties, feestjes, carnaval, werk, iets deuzigs enz. 
            </p>    
            <p>
                Het uploaden is niet heel moeilijk, hieronder vinden jullie een korte instructie. 
            </p>
                
           
            <p>
                Hoe een herinnering toe te voegen:
            </p>
            <ul>
                <li>Ga naar "creëer herinnering".</li>
                <li> Verzin een titel voor het verhaal, foto of video.</li>
                <li>Schrijf je tekst. Bij een groter verhaal raden wij aan het eerst buiten de website te schrijven en het erin te copy / pasten. Er is GEEN mogelijkheid je tekst na het toevoegen aan te passen, dit om te voorkomen dat andere teksten ook zomaar aangepast kunnen worden. **</li>
                <li> Kies je bestand (PNG, JPG, JPEG, MP3, MP4) Max 100 Mb. </li>
                <li> Kies je tekstkleur en kaartkleur en check of het naar wens is zoals weergegeven in het voorbeeldkader. (voorbeeld kaart)</li>
                <li>Als laatste stap je herinnering toevoegen. </li>
                <li>Je kunt nu je herinnering bekijken. Bij grotere bestanden zal dit iets langer duren. </li>
            </ul>
        </Modal.Body>
        <Modal.Footer>
            <p className="mr-auto">
            ** Mocht je toch een fout hebben gemaakt stuur een <a href="mailto:mikalob247@gmail.com">bericht</a> via de contact knop.
            </p>
        </Modal.Footer>
      </Modal>
    )
}
