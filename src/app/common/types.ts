export class InvokableService
{
  invoke( _commandParts : string[] ) : string
  {
    const command = _commandParts[1]

    console.log( typeof( ( this as any )[command]() ) )

    return '';
  }
}
