import Service from '@ember/service';
import Band from 'rarwe/models/band';
import Song from 'rarwe/models/song';
import { tracked } from 'tracked-built-ins';
import { isArray } from '@ember/array';

function extractRelationships(object) {
  let relationships = {};
  for (let relationshipName in object) {
    relationships[relationshipName] = object[relationshipName].links.related;
  }
  return relationships;
}

export default class CatalogService extends Service {
  storage = {};

  constructor() {
    super(...arguments);
    this.storage.bands = tracked([]);
    this.storage.songs = tracked([]);
  }

  async fetchAll(type) {
    if (type === 'bands') {
      let response = await fetch('/bands');
      let json = await response.json();
      this.loadAll(json);
      return this.bands;
    }
    if (type === 'songs') {
      let response = await fetch('/songs');
      let json = await response.json();
      this.loadAll(json);
      return this.songs;
    }
  }

  loadAll(json) {
    let records = [];
    for (let item of json.data) {
      records.push(this._loadResource(item));
    }
    return records;
  }

  load(response) {
    return this._loadResource(response.data);
  } /* load() complements the loadAll() method and extracts and loads a single record
  to the catalog from the response*/

  _loadResource(data) {
    let record;
    let { id, type, attributes, relationships } = data;
    if (type === 'bands') {
      let rels = extractRelationships(relationships);
      record = new Band({ id, ...attributes }, rels);
      this.add('band', record);
    }
    if (type === 'songs') {
      let rels = extractRelationships(relationships);
      record = new Song({ id, ...attributes }, rels);
      this.add('song', record);
    }
    return record;
  }
  /*_loadResource  takes care of all the details of creating
  a new model record and adding it to the catalog
  the single parameter it takes must be added to the routes/bands.js now*/

  async fetchRelated(record, relationship) {
    let url = record.relationships[relationship];
    let response = await fetch(url);
    let json = await response.json();
    if (isArray(json.data)) {
      record[relationship] = this.loadAll(json);
    } else {
      record[relationship] = this.load(json);
    }
    return record[relationship];
  }
  /* fetchRelated() is creating a place where we query the relationship URL previously stored for the band
our goal is to utilize the catalog service to make all network requests

This method requests the back-end for the related records and loads them to the storage of catalog

Then, it assigns the created related records to a "relationship" property, like the songs property of Band model instances.

It also is able to retrieve a 1:1 relationship.
*/

  async create(type, attributes, relationships = {}) {
    let payload = {
      data: {
        type: type === 'band' ? 'bands' : 'songs',
        attributes,
        relationships,
      },
    };
    let response = await fetch(type === 'band' ? '/bands' : '/songs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json',
      },
      body: JSON.stringify(payload),
    });
    let json = await response.json();
    return this.load(json);
  } /*We also make create & load return the record that has been created*/

  /*In similar fashion, we define an update method on the catalog service as well*/
  async update(type, record, attributes) {
    let payload = {
      data: {
        id: record.id,
        type: type === 'band' ? 'bands' : 'songs',
        attributes,
      },
    };
    let url = type === 'band' ? `/bands/${record.id}` : `/songs/${record.id}`;
    await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/vnd.api+json',
      },
      body: JSON.stringify(payload),
    });
  }

  add(type, record) {
    let collection = type === 'band' ? this.storage.bands : this.storage.songs;

    let recordIds = collection.map((record) => record.id);
    if (!recordIds.includes(record.id)) {
      collection.push(record);
    }
  } /*So we can ensure that we are not adding a record with the same id multiple times
  We are updating the code

  We have set it to where items in the collection are unique on their ids
  technically, our collections are arrays and not maps (which is less than ideal),
  but they implement the idea behind the identity maps just the same*/

  find(type, filterFn) {
    let collection = type === 'band' ? this.bands : this.songs;
    return collection.find(filterFn);
  }

  get bands() {
    return this.storage.bands;
  }
  get songs() {
    return this.storage.songs;
  }
}
