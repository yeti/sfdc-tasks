export default class TaskWrapper {
  constructor(data) {
    this._cache = { data };
  }

  get data() {
    return this._cache.data;
  }

  get id() {
    return this.data.Id;
  }

  get name() {
    return this.data.Subject;
  }

  get dueDate() {
    return new Date(this.data.ActivityDate);
  }

  get isPastDue() {
    return new Date > this.dueDate;
  }

  get related() {
    return this.data.What || this.data.Who;
  }

  get relatedRecord() {
    if (!this._cache.relatedRecord) {
      this._cache.relatedRecord = this.related ? new RelatedRecordWrapper(this.related) : null;
    }
    return this._cache.relatedRecord;
  }

}

class RelatedRecordWrapper {
  constructor(data) {
    this._cache = { data };
  }

  get data() {
    return this._cache.data;
  }

  get name() {
    return this.data.Name;
  }

  get id() {
    return this.data.Id;
  }

  get type() {
    return this.data.Type;
  }

  get iconType() {
    return this.type.toLowerCase();
  }

  get isOpportunity() {
    return this.type === 'Opportunity';
  }

  get isContact() {
    return this.type === 'Contact';
  }

  get isAccount() {
    return this.type === 'Account';
  }

  get isLead() {
    return this.type === 'Lead';
  }
}
